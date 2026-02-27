import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Lock, Mail, User, Phone, Globe2, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortalAuth } from './hooks/usePortalAuth';
import { useTranslation, Language } from './i18n/translations';
import PortalHeader from './components/PortalHeader';

const countries = [
  'Kenya', 'Qatar', 'UAE', 'Saudi Arabia', 'Uganda', 'Sri Lanka',
  'Philippines', 'Tunisia', 'Algeria', 'Somalia', 'Syria', 'Ethiopia',
  'Sudan', 'Eritrea', 'Egypt', 'Kuwait'
];

const PortalRegister: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '', email: '', mobile: '', country: 'Kenya',
    password: '', confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const t = useTranslation(lang);
  const { signUp } = usePortalAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    setLoading(true);
    const { error } = await signUp(form.email, form.password, form.fullName, form.mobile, form.country);
    
    if (error) {
      setError(typeof error === 'object' && 'message' in error ? (error as any).message : 'Registration failed');
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  const updateForm = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  if (success) {
    return (
      <div className="min-h-screen bg-muted/30" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <PortalHeader lang={lang} onToggleLang={() => setLang(l => l === 'en' ? 'ar' : 'en')} />
        <div className="flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md shadow-xl border-0">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h2 className={`text-xl font-bold ${lang === 'ar' ? 'font-arabic' : ''}`}>{t.success}!</h2>
              <p className="text-muted-foreground text-sm">{t.registrationSuccess}</p>
              <Link to="/customer-portal">
                <Button className="mt-4">{t.signIn}</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <PortalHeader lang={lang} onToggleLang={() => setLang(l => l === 'en' ? 'ar' : 'en')} />
      
      <div className="flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-lg shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className={`text-2xl font-bold ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {t.createAccount}
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-1">{t.registerToTrack}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><User className="h-4 w-4" />{t.fullName}</Label>
                  <Input value={form.fullName} onChange={e => updateForm('fullName', e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Phone className="h-4 w-4" />{t.mobileNumber}</Label>
                  <Input value={form.mobile} onChange={e => updateForm('mobile', e.target.value)} required placeholder="+254..." />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Mail className="h-4 w-4" />{t.email}</Label>
                <Input type="email" value={form.email} onChange={e => updateForm('email', e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Globe2 className="h-4 w-4" />{t.country}</Label>
                <Select value={form.country} onValueChange={v => updateForm('country', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Lock className="h-4 w-4" />{t.password}</Label>
                  <Input type="password" value={form.password} onChange={e => updateForm('password', e.target.value)} required minLength={6} />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Lock className="h-4 w-4" />{t.confirmPassword}</Label>
                  <Input type="password" value={form.confirmPassword} onChange={e => updateForm('confirmPassword', e.target.value)} required minLength={6} />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.registering}</> : t.register}
              </Button>
            </form>

            {error && (
              <Alert className="mt-4" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                {t.haveAccount}{' '}
                <Link to="/customer-portal" className="text-primary font-medium hover:underline">
                  {t.signInHere}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortalRegister;
