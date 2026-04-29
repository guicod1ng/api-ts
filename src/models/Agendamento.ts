export type Agendamento = {
  id: number;
  cliente_id: number;
  data: string;
  hora: string;
  servico: string;
  cliente_nome?: string;
  criado_em?: string;
};