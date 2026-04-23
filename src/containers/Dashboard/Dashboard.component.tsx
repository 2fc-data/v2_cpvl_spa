// src/containers/Dashboard/Dashboard.component.tsx
import { useCallback, useEffect, useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';
import MainNav from '../../components/MainNav';
import type { IAllowedRoutes } from '../../types';
import { useAuth } from '@/context/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { StatusList } from '../../pages/StatusList';
import { EmergencyContact } from '../../components/EmergencyContact';
import { EditProfile } from '../../components/EditProfile';
import { LicenseData } from '../../components/LicenseData';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AlertCircle, CheckCircle2, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const DashboardHome = () => {
  const { profile, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (isAdmin) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Visão Administrativa</h2>
            <p className="text-slate-500 font-medium">Gestão global do clube e decolagens.</p>
          </div>
          {profile?.routes?.some(r => r.route === 'datapanel') && (
            <Button 
              onClick={() => navigate('/dashboard/datapanel')}
              className="rounded-xl font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Painel de Dados
            </Button>
          )}
        </div>
        <StatusList />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Bem-vindo, {profile?.pilotInfo?.firstName || profile?.user?.username}!
            </h2>
            <p className="text-slate-500 font-medium">Aqui está o resumo da sua situação atual no clube.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Seu Status</h3>
              <div className="flex items-center gap-4">
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg",
                  profile?.pilotInfo?.status === 'filiado' ? "bg-green-500 text-white shadow-green-200" : "bg-amber-500 text-white shadow-amber-200"
                )}>
                  {profile?.pilotInfo?.status === 'filiado' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 capitalize">
                    {profile?.pilotInfo?.status || 'Pendente'}
                  </p>
                  <p className="text-sm text-slate-500 font-medium">Situação cadastral</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-4 flex flex-col justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Acesso Rápido</h3>
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={() => navigate('/dashboard/pilots/' + profile?.user?.id)}
                  className="rounded-xl font-bold bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm"
                >
                  Meus Dados
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/dashboard/status-list')}
                  className="rounded-xl font-bold border-slate-200 text-slate-600"
                >
                  Decolagem
                </Button>
                {profile?.routes?.some(r => r.route === 'datapanel') && (
                  <Button 
                    variant="ghost"
                    onClick={() => navigate('/dashboard/datapanel')}
                    className="rounded-xl font-bold text-primary hover:bg-primary/5 gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Painel de Dados
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900 px-2">Pilotos no Mural</h3>
        <StatusList />
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const { profile } = useAuth();
  const allowedRoutes = profile?.routes;
  const warnings = profile?.warnings;
  const userData = profile?.user;
  const pilotInfo = profile?.pilotInfo;

  const [openEmergencyModal, setOpenEmergencyModal] = useState(false);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openLicenseModal, setOpenLicenseModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [, setIsLogged] = useSessionStorage(
    import.meta.env.VITE_LOGGED_KEY || 'CPVL_USER_IS_LOGGED',
    false
  );

  const navigate = useNavigate();

  const doLogout = useCallback(() => {
    setIsLogged(false);
    navigate('/');
  }, [setIsLogged, navigate]);

  const navTo = useCallback(
    (link: IAllowedRoutes) => {
      if (link.route === 'emergency-contact') {
        setOpenEmergencyModal(true);
      } else if (link.route === 'edit-profile') {
        setOpenEditProfileModal(true);
      } else if (link.route === 'license-data') {
        setOpenLicenseModal(true);
      } else {
        navigate(`/dashboard/${link.route}`);
      }
    },
    [navigate]
  );

  const handleCloseEmergencyModal = useCallback(() => {
    setOpenEmergencyModal(false);
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleCloseEditProfileModal = useCallback(() => {
    setOpenEditProfileModal(false);
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleCloseLicenseModal = useCallback(() => {
    setOpenLicenseModal(false);
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // Se o usuário estiver na raiz do dashboard, redireciona para a primeira rota permitida
    if (
      window.location.pathname === '/dashboard' ||
      window.location.pathname === '/dashboard/'
    ) {
      if (allowedRoutes && allowedRoutes.length > 0) {
        // Encontra a primeira rota que não seja modal
        const firstRoute = allowedRoutes.find(r =>
          !['emergency-contact', 'edit-profile', 'license-data'].includes(r.route)
        ) || allowedRoutes[0];

        navigate(`/dashboard/${firstRoute.route}`, { replace: true });
      }
    }
  }, [allowedRoutes, navigate]);

  if (!allowedRoutes) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-500">
      <MainNav
        onLogout={doLogout}
        allowedRoutes={allowedRoutes}
        onNav={navTo}
        userData={pilotInfo || userData}
      />

      <main className="flex-1 pt-20 pb-12">
        <div key={refreshKey} className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {warnings && warnings.length > 0 && (
            <div className="flex flex-col gap-3 mb-6 animate-in slide-in-from-top-4 duration-500">
              {warnings.map((warning, idx) => (
                <Alert key={idx} variant="destructive" className="border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 border shadow-sm rounded-xl">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="font-bold">Atenção</AlertTitle>
                  <AlertDescription className="font-medium">
                    {warning}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Modals */}
      <Dialog open={openEmergencyModal} onOpenChange={setOpenEmergencyModal}>
        <DialogContent 
          className="sm:max-w-3xl rounded-3xl border border-border shadow-2xl bg-background/95 backdrop-blur-xl"
          closeClassName="text-white bg-slate-900/20 hover:bg-slate-900/40 p-2 rounded-full [&_svg]:size-6 transition-all border-none"
        >
          {userData && (
            <EmergencyContact
              userId={userData.id}
              userName={userData.username}
              onClose={handleCloseEmergencyModal}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openEditProfileModal} onOpenChange={setOpenEditProfileModal}>
        <DialogContent 
          className="sm:max-w-4xl rounded-3xl border border-border shadow-2xl bg-background/95 backdrop-blur-xl p-0 overflow-y-auto max-h-[95vh]"
          closeClassName="text-white bg-slate-900/40 hover:bg-slate-900/60 p-2 rounded-full [&_svg]:size-6 transition-all border-none shadow-lg z-50"
        >
          {userData && (
            <EditProfile
              userId={userData.id}
              onClose={handleCloseEditProfileModal}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openLicenseModal} onOpenChange={setOpenLicenseModal}>
        <DialogContent className="sm:max-w-4xl rounded-3xl border border-border shadow-2xl bg-background/95 backdrop-blur-xl p-0 overflow-y-auto max-h-[95vh]">
          {userData && (
            <LicenseData
              userId={userData.id}
              userName={userData.username}
              onClose={handleCloseLicenseModal}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

