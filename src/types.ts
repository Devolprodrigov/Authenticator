export interface ResponsavelTecnico {
  nome: string;
  registro: string;
  funcao: string;
}

export interface DocumentoSST {
  id: string;
  codigoDocumento: string; // UUID or key
  empresa: string;
  cnpj: string;
  cnae?: string;
  grauRisco?: string;
  trabalhador: string;
  cpf: string;
  cargo: string;
  matricula?: string;
  tipoDocumento: string;
  dataRegistro: string;
  dataEmissao?: string;
  validade?: string;
  status: string;
  statusTipo: 'valido' | 'vencido' | 'revogado';
  sha256: string;
  responsavelTecnico: ResponsavelTecnico;
  medicoCoordenador?: {
    nome: string;
    crm: string;
    uf: string;
  };
  eventoEsocial?: string; // e.g. "S-2220 - Monitoramento da Saúde do Trabalhador"
  normasAplicaveis?: string[];
  conteudoProgramatico?: string[]; // for trainings
  cargaHoraria?: string; // for trainings
  localExame?: string;
  observacoes?: string;
}

export interface HistoricoConsulta {
  codigo: string;
  tipoDocumento: string;
  trabalhador: string;
  dataConsulta: string;
  statusTipo: 'valido' | 'vencido' | 'revogado';
}
