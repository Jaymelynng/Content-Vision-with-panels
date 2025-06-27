
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function Auth() {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithPin, gym } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (gym) {
      navigate('/content-library');
    }
  }, [gym, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pin) {
      toast.error('Please enter your gym PIN');
      return;
    }

    setLoading(true);
    
    const { error } = await signInWithPin(pin);
    
    if (error) {
      toast.error(error);
    } else {
      toast.success('Welcome to your gym\'s content library!');
      navigate('/content-library');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to Content Creator
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your gym PIN to access your content library
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gym Access</CardTitle>
            <CardDescription>
              Enter your gym's PIN to access content and tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="pin">Gym PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter your 4-digit PIN"
                  maxLength={4}
                  required
                  className="text-center text-2xl tracking-widest"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Access Content Library'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>

        {/* Demo PINs for testing */}
        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">Demo PINs for testing:</p>
          <div className="space-y-1">
            <p>Elite Gymnastics Academy: <span className="font-mono">1234</span></p>
            <p>Champions Gym Center: <span className="font-mono">5678</span></p>
            <p>Victory Athletics: <span className="font-mono">9999</span></p>
            <p>Premier Gymnastics: <span className="font-mono">0000</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
