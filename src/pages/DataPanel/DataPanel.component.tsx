// src/pages/DataPanel/DataPanel.component.tsx
import { BarChart3, PieChart, Activity, TrendingUp } from 'lucide-react';
import { PieChartComponent } from '../../components/Charts/PieChart/PieChart.component';
import { useFetch } from '../../hooks';
import { API, getURI } from '../../services';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

export const DataPanel = () => {
  const { data: statsResponse, loading: isLoading } = useFetch<any>({
    url: getURI(API.stats)
  });

  const pilotStatusData = statsResponse?.pilotStatusData || [];
  const paymentStatusData = statsResponse?.paymentStatusData || [];

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 animate-in fade-in duration-700">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
          <BarChart3 className="text-primary w-8 h-8" />
          Painel de Dados
        </h1>
        <p className="text-muted-foreground font-medium">Insights analíticos sobre a base de pilotos e situação financeira</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Spinner className="w-12 h-12 text-primary" />
          <p className="text-muted-foreground font-bold animate-pulse">Compilando estatísticas…</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Status dos Pilotos */}
          <Card className="border border-border shadow-[0_20px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] bg-card/70 backdrop-blur-xl rounded-[40px] overflow-hidden group transition-all duration-500">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <PieChart className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black text-foreground">Status dos Pilotos</CardTitle>
                  <CardDescription className="font-medium">Distribuição por situação cadastral</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full flex items-center justify-center">
                {pilotStatusData.length > 0 ? (
                  <PieChartComponent data={pilotStatusData} />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground/30">
                    <Activity className="w-12 h-12 opacity-20" />
                    <p className="font-bold">Sem dados de pilotos</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Chart 2: Situação de Pagamento (Filiados) */}
          <Card className="border border-border shadow-[0_20px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] bg-card/70 backdrop-blur-xl rounded-[40px] overflow-hidden group transition-all duration-500">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-black text-foreground">Situação Financeira</CardTitle>
                  <CardDescription className="font-medium">Pagamentos mensais (apenas Filiados)</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full flex items-center justify-center">
                {paymentStatusData.length > 0 ? (
                  <PieChartComponent
                    data={paymentStatusData}
                    colors={['#10b981', '#f97316']} // Tailwind Emerald 500, Orange 500
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground/30">
                    <TrendingUp className="w-12 h-12 opacity-20" />
                    <p className="font-bold">Sem dados de filiados</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
