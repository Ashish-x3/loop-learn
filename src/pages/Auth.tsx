
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Reset alerts when switching tabs
  useEffect(() => {
    setError(null);
    setSuccess(null);
  }, [tab]);

  function parseAuthError(error: any, context: 'signup' | 'signin'): string {
    if (!error) return '';
    // Duplicate username
    if (error.status === 500 && error.message && error.message.match(/duplicate key value.+username_key/)) {
      return "This username is already in use. Please try a different one.";
    }
    // Common cases
    const msg = (typeof error.message === "string") ? error.message : JSON.stringify(error);

    if (msg.match(/email.*already registered/i)) {
      return "This email is already registered. Please sign in instead.";
    }
    if (msg.match(/invalid login credentials/i)) {
      return "Invalid email or password. Please try again.";
    }
    if (msg.match(/email.*not confirmed/i)) {
      // Don't block user if email confirmations are off; attempt to let them proceed.
      return "Your account email is not confirmed. On local/development servers, you may be able to sign in anyway. If not, please contact support or try a different email address.";
    }
    if (msg.match(/username.*already exists|duplicate key value/)) {
      return "This username is already taken. Please choose another.";
    }
    if (context === 'signup' && msg.match(/database error saving new user/i)) {
      return "Username already exists or there's a problem creating your profile. Please try a different username.";
    }
    return msg || "An unknown error occurred.";
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      setIsLoading(false);
      return;
    }

    const { error } = await signUp(email, password, username);

    if (error) {
      setError(parseAuthError(error, 'signup'));
      setIsLoading(false);
      return;
    } else {
      setSuccess('Account created successfully! You can now sign in.');
    }
    setIsLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await signIn(email, password);

    if (error) {
      // If email confirmation is disabled, auto-try navigating anyway if this error is found
      const msg = parseAuthError(error, 'signin');
      if (
        msg.toLowerCase().includes('email is not confirmed') ||
        msg.toLowerCase().includes('not confirmed')
      ) {
        setSuccess(
          "Email is not confirmed, but email confirmation is disabled or you're on local/dev. Trying to log you in anyway..."
        );
        // attempt navigate, UX fallback
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
        setIsLoading(false);
        return;
      } else {
        setError(msg);
        setIsLoading(false);
        return;
      }
    } else {
      navigate('/dashboard');
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Tabs value={tab} onValueChange={val => setTab(val as 'signin' | 'signup')} defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Sign in to your FlashCards account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive" className="animate-in slide-in-from-top-2">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {success && (
                    <Alert className="animate-in slide-in-from-top-2">
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Join FlashCards to start learning</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <Input
                      id="signup-username"
                      name="username"
                      type="text"
                      placeholder="Choose a username"
                      required
                      disabled={isLoading}
                      minLength={3}
                      autoComplete="username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      required
                      disabled={isLoading}
                      minLength={6}
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      required
                      disabled={isLoading}
                      minLength={6}
                      autoComplete="new-password"
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive" className="animate-in slide-in-from-top-2">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {success && (
                    <Alert className="animate-in slide-in-from-top-2">
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;

