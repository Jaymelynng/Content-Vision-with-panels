
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
                  type="text"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.toUpperCase())}
                  placeholder="Enter your gym PIN"
                  required
                  className="text-center text-lg tracking-widest"
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

        {/* Updated with actual gym PINs */}
        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">Gym PINs:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <p>Capital Gymnastics Pflugerville: <span className="font-mono">CPF</span></p>
              <p>Capital Gymnastics Round Rock: <span className="font-mono">CRR</span></p>
              <p>Capital Gymnastics Cedar Park: <span className="font-mono">CCP</span></p>
              <p>Rowland Ballard Atascocita: <span className="font-mono">RBA</span></p>
              <p>Rowland Ballard Kingwood: <span className="font-mono">RBK</span></p>
              <p>Houston Gymnastics Academy: <span className="font-mono">HGA</span></p>
            </div>
            <div className="space-y-1">
              <p>Estrella Gymnastics: <span className="font-mono">EST</span></p>
              <p>Oasis Gymnastics: <span className="font-mono">OAS</span></p>
              <p>Scottsdale Gymnastics: <span className="font-mono">SGT</span></p>
              <p>Tigar Gymnastics: <span className="font-mono">TIG</span></p>
              <p>Jayme (Owner Admin): <span className="font-mono">1426</span></p>
              <p>Kim (Admin View): <span className="font-mono">2222</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
