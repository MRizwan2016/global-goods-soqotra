import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lock, Mail, Package, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortalAuth } from './hooks/usePortalAuth';
import { useTranslation, Language } from './i18n/translations';
import PortalHeader from './components/PortalHeader';
import { useAuth } from '@/hooks/use-auth';

const PortalLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const t = useTranslation(lang);
  
  const { signIn, user } = usePortalAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/customer-portal/dashboard');
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
    } else {
      navigate('/customer-portal/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-muted/30" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <PortalHeader lang={lang} onToggleLang={() => setLang(l => l === 'en' ? 'ar' : 'en')} />
      
      <div className="flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className={`text-2xl font-bold ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {t.welcomeBack}
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-1">{t.signInToTrack}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t.email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={lang === 'ar' ? 'text-right' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  {t.password}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.signingIn}</>
                ) : t.signIn}
              </Button>
            </form>

            {error && (
              <Alert className="mt-4" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                {t.noAccount}{' '}
                <Link to="/customer-portal/register" className="text-primary font-medium hover:underline">
                  {t.registerHere}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <footer className="text-center py-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Soqotra Logistics Services, Transportation & Trading WLL
      </footer>
    </div>
  );
};

export default PortalLogin;
