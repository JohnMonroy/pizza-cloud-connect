import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Pizza, Lock, Mail, Eye, EyeOff, KeyRound } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [requiresNewPassword, setRequiresNewPassword] = useState(false);
  const { login, completeNewPassword, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: '¡Bienvenido!',
        description: 'Has iniciado sesión correctamente',
      });
      navigate('/admin');
    } else if (result.newPasswordRequired) {
      setRequiresNewPassword(true);
      toast({
        title: 'Cambio de contraseña requerido',
        description: 'Debes establecer una nueva contraseña',
      });
    } else {
      toast({
        title: 'Error de acceso',
        description: result.error || 'Email o contraseña incorrectos',
        variant: 'destructive',
      });
    }
  };

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Las contraseñas no coinciden',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: 'Error',
        description: 'La contraseña debe tener al menos 8 caracteres',
        variant: 'destructive',
      });
      return;
    }

    const success = await completeNewPassword(newPassword);
    
    if (success) {
      toast({
        title: '¡Contraseña actualizada!',
        description: 'Has iniciado sesión correctamente',
      });
      navigate('/admin');
    } else {
      toast({
        title: 'Error',
        description: 'No se pudo cambiar la contraseña. Asegúrate de incluir mayúsculas, minúsculas, números y símbolos.',
        variant: 'destructive',
      });
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
          {!requiresNewPassword ? (
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
                    Accediendo...
                  </div>
                ) : (
                  'Acceder'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleNewPasswordSubmit} className="space-y-6">
              <div className="text-center mb-4">
                <KeyRound className="w-12 h-12 text-primary mx-auto mb-2" />
                <h2 className="text-xl font-bold text-primary-foreground">Nueva Contraseña</h2>
                <p className="text-primary-foreground/60 text-sm mt-1">
                  Establece una nueva contraseña para continuar
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-primary-foreground/80 text-sm font-bold uppercase tracking-wide">
                  Nueva Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/40" />
                  <Input
                    id="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-11 pr-11 bg-pizza-black border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary focus:ring-primary h-12 rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-primary-foreground/80 text-sm font-bold uppercase tracking-wide">
                  Confirmar Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/40" />
                  <Input
                    id="confirmPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-11 bg-pizza-black border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary focus:ring-primary h-12 rounded-lg"
                    required
                  />
                </div>
              </div>

              <p className="text-primary-foreground/50 text-xs">
                La contraseña debe incluir: mayúsculas, minúsculas, números y símbolos (!@#$%)
              </p>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-pizza-red-dark text-primary-foreground font-bold py-6 text-lg rounded-lg uppercase tracking-wide transition-all hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Guardando...
                  </div>
                ) : (
                  'Establecer Contraseña'
                )}
              </Button>
            </form>
          )}
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
