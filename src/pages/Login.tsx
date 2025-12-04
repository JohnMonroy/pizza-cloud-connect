import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Pizza, Lock, Mail, Eye, EyeOff, UserPlus } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, signUp, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (password.length < 6) {
        toast({
          title: 'Error',
          description: 'La contraseña debe tener al menos 6 caracteres',
          variant: 'destructive',
        });
        return;
      }

      const result = await signUp(email, password);
      
      if (result.success) {
        toast({
          title: '¡Cuenta creada!',
          description: 'Has sido registrado correctamente',
        });
        navigate('/admin');
      } else {
        toast({
          title: 'Error de registro',
          description: result.error || 'No se pudo crear la cuenta',
          variant: 'destructive',
        });
      }
    } else {
      const result = await login(email, password);
      
      if (result.success) {
        toast({
          title: '¡Bienvenido!',
          description: 'Has iniciado sesión correctamente',
        });
        navigate('/admin');
      } else {
        toast({
          title: 'Error de acceso',
          description: result.error || 'Email o contraseña incorrectos',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-pizza-black flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-4 shadow-lg">
            <Pizza className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-black text-primary-foreground uppercase tracking-tight">
            Pizza Hut
          </h1>
          <p className="text-primary-foreground/60 mt-2">Panel de Administración</p>
        </div>

        {/* Login Card */}
        <div className="bg-pizza-dark rounded-2xl p-8 shadow-2xl border border-primary-foreground/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-foreground/80 text-sm font-bold uppercase tracking-wide">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@pizzahut.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 bg-pizza-black border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary focus:ring-primary h-12 rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary-foreground/80 text-sm font-bold uppercase tracking-wide">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/40" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 pr-11 bg-pizza-black border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary focus:ring-primary h-12 rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-pizza-red-dark text-primary-foreground font-bold py-6 text-lg rounded-lg uppercase tracking-wide transition-all hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {isSignUp ? 'Registrando...' : 'Accediendo...'}
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center">
                  {isSignUp ? <UserPlus className="w-5 h-5" /> : null}
                  {isSignUp ? 'Crear Cuenta' : 'Acceder'}
                </div>
              )}
            </Button>
          </form>

          {/* Toggle Sign Up / Login */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary-foreground/60 hover:text-accent transition-colors text-sm"
            >
              {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-primary-foreground/60 hover:text-accent transition-colors text-sm"
          >
            ← Volver a la web
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
