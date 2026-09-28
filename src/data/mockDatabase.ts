import { DocumentoSST } from '../types';

export const INITIAL_DOCUMENTS: DocumentoSST[] = [
  {
    id: 'doc-001',
    codigoDocumento: '6bccd30d-c287-4002-91c5-f07bba3907bc',
    empresa: 'SHMV Serviços e Construções LTDA',
    cnpj: '31.958.736/0001-09',
    cnae: '43.99-1-03 - Obras de alvenaria e acabamentos',
    grauRisco: 'Grau 3 (NR-04)',
    trabalhador: 'RODRIGO VIEIRA',
    cpf: '138.828.127-96',
    cargo: 'SERRALHEIRO',
    matricula: 'SHMV-0042',
    tipoDocumento: 'ASO - Atestado de Saúde Ocupacional (Periódico)',
    dataRegistro: '28/09/2026 14:18:32',
    dataEmissao: '28/09/2026',
    validade: '28/09/2027',
    status: 'DOCUMENTO ÍNTEGRO - ASSINADO E VALIDADO',
    statusTipo: 'valido',
    sha256: '6a891ed1lab541812073cdb99ea5d68f87dd97fe36dc52f57e631805cf1d7e40',
    responsavelTecnico: {
      nome: 'Rodrigo Vieira',
      registro: 'Reg. MTE/SRT 0058291/RJ',
      funcao: 'Técnico em Segurança do Trabalho (TST) - RRV Consultoria'
    },
    medicoCoordenador: {
      nome: 'Dr. Carlos Eduardo Guimarães',
      crm: 'CRM/RJ 52.88419-2',
      uf: 'RJ'
    },
    eventoEsocial: 'S-2220 - Monitoramento da Saúde do Trabalhador',
    normasAplicaveis: ['NR-01 - Disposições Gerais e GRO', 'NR-07 - PCMSO', 'Portaria MTP 671/2021'],
    localExame: 'Clínica de Medicina Ocupacional Integrada - Volta Redonda/RJ',
    observacoes: 'Apto para o exercício da função de Serralheiro com aptidão específica para Trabalho em Altura (NR-35) e Espaço Confinado (NR-33).'
  },
  {
    id: 'doc-002',
    codigoDocumento: '9f82d110-e744-42b8-932b-47e1bc81d892',
    empresa: 'SHMV Serviços e Construções LTDA',
    cnpj: '31.958.736/0001-09',
    cnae: '43.99-1-03 - Obras de alvenaria e acabamentos',
    grauRisco: 'Grau 3 (NR-04)',
    trabalhador: 'RODRIGO VIEIRA',
    cpf: '138.828.127-96',
    cargo: 'SERRALHEIRO INDUSTRIAL',
    matricula: 'SHMV-0042',
    tipoDocumento: 'Certificado de Capacitação NR-35 - Trabalho em Altura',
    dataRegistro: '15/05/2026 10:30:15',
    dataEmissao: '15/05/2026',
    validade: '15/05/2028',
    status: 'DOCUMENTO ÍNTEGRO - ASSINADO E VALIDADO',
    statusTipo: 'valido',
    sha256: '9b734892cfae812d48bb70129a00fe18402cc29451da7ebbc4d9e187e1a3bc89',
    responsavelTecnico: {
      nome: 'Rodrigo Vieira - Instrutor Credenciado',
      registro: 'Reg. MTE/SRT 0058291/RJ',
      funcao: 'Instrutor e Responsável Técnico RRV Consultoria'
    },
    eventoEsocial: 'S-2245 - Treinamentos, Capacitações e Exercícios Simulados',
    normasAplicaveis: ['NR-35 - Trabalho em Altura', 'NR-01 - Anexo II (Capacitação e Treinamento)'],
    cargaHoraria: '08 Horas (Teórico e Prático)',
    conteudoProgramatico: [
      'Normas e regulamentos aplicáveis ao trabalho em altura',
      'Análise de Risco e condições impeditivas',
      'Riscos potenciais inerentes ao trabalho em altura e medidas de prevenção',
      'Sistemas, equipamentos e procedimentos de proteção coletiva e individual',
      'Acidentes típicos em trabalhos em altura e condutas em situações de emergência'
    ],
    observacoes: 'Aprovado com aproveitamento satisfatório de 95% em avaliação teórica e prática.'
  },
  {
    id: 'doc-003',
    codigoDocumento: 'pgr-shmv-2026-8837a1',
    empresa: 'SHMV Serviços e Construções LTDA',
    cnpj: '31.958.736/0001-09',
    cnae: '43.99-1-03',
    grauRisco: 'Grau 3',
    trabalhador: 'EMPRESA INTEGRAL (TODOS OS POSTOS DE TRABALHO)',
    cpf: '31.958.736/0001-09',
    cargo: 'GERAL - GESTÃO DE RISCOS OCUPACIONAIS',
    tipoDocumento: 'PGR - Programa de Gerenciamento de Riscos (Inventário + Plano de Ação)',
    dataRegistro: '10/01/2026 09:12:00',
    dataEmissao: '10/01/2026',
    validade: '10/01/2028',
    status: 'DOCUMENTO ÍNTEGRO - ASSINADO E VALIDADO',
    statusTipo: 'valido',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    responsavelTecnico: {
      nome: 'Eng. Leonardo Silveira Santos',
      registro: 'CREA/RJ 201810452-1',
      funcao: 'Engenheiro de Segurança do Trabalho - Perito'
    },
    eventoEsocial: 'S-2240 - Condições Ambientais do Trabalho - Fatores de Risco',
    normasAplicaveis: ['NR-01 - PGR/GRO', 'NR-09 - Avaliação e Controle das Exposições Ocupacionais'],
    observacoes: 'Inventário de riscos contemplando agentes físicos (ruído, vibração), químicos (fumos metálicos de solda e corte) e mecânicos/ergonômicos.'
  },
  {
    id: 'doc-004',
    codigoDocumento: 'nr10-2026-7782b9',
    empresa: 'SHMV Serviços e Construções LTDA',
    cnpj: '31.958.736/0001-09',
    trabalhador: 'MARCOS ANTÔNIO DA SILVA',
    cpf: '098.712.345-21',
    cargo: 'ELETRICISTA DE MANUTENÇÃO',
    matricula: 'SHMV-0019',
    tipoDocumento: 'Certificado de Treinamento NR-10 - Básico em Segurança em Instalações Elétricas',
    dataRegistro: '04/03/2026 16:45:00',
    dataEmissao: '04/03/2026',
    validade: '04/03/2028',
    status: 'DOCUMENTO ÍNTEGRO - ASSINADO E VALIDADO',
    statusTipo: 'valido',
    sha256: 'd85f67a216c5b96a84f3e6912384918e95c106509e51631484050d24921f0088',
    responsavelTecnico: {
      nome: 'Rodrigo Vieira',
      registro: 'Reg. MTE/SRT 0058291/RJ',
      funcao: 'Instrutor Técnico RRV Consultoria'
    },
    eventoEsocial: 'S-2245 - Treinamentos e Capacitações',
    cargaHoraria: '40 Horas',
    normasAplicaveis: ['NR-10 - Segurança em Instalações e Serviços em Eletricidade']
  },
  {
    id: 'doc-005',
    codigoDocumento: 'aso-vencido-2024-teste',
    empresa: 'Logística & Transportes Sul Fluminense LTDA',
    cnpj: '18.442.901/0001-55',
    trabalhador: 'FERNANDO ALBUQUERQUE GOMES',
    cpf: '233.119.870-04',
    cargo: 'MOTORISTA CARRETEIRO',
    matricula: 'LOG-102',
    tipoDocumento: 'ASO - Atestado de Saúde Ocupacional (Periódico)',
    dataRegistro: '12/02/2024 11:20:00',
    dataEmissao: '12/02/2024',
    validade: '12/02/2025',
    status: 'DOCUMENTO VENCIDO - NECESSITA RENOVAÇÃO',
    statusTipo: 'vencido',
    sha256: '512f4581290bb3219460029b3c4a9f635032a101f3dbca7692138bc93a382103',
    responsavelTecnico: {
      nome: 'Dr. Paulo Roberto Neves',
      registro: 'CRM/RJ 52.41829-0',
      funcao: 'Médico Examinador'
    },
    eventoEsocial: 'S-2220 - Monitoramento da Saúde do Trabalhador',
    normasAplicaveis: ['NR-07 - PCMSO'],
    observacoes: 'Atenção: A validade deste documento de saúde ocupacional expirou em 12/02/2025. É obrigatório agendar novo exame periódico conforme PCMSO.'
  }
];

const STORAGE_KEY = 'rrv_consultoria_documentos_v1';
const HISTORY_KEY = 'rrv_consultoria_historico_v1';

export function getDocumentos(): DocumentoSST[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Erro ao ler documentos do localStorage', e);
  }
  return INITIAL_DOCUMENTS;
}

export function saveDocumento(doc: DocumentoSST): void {
  try {
    const current = getDocumentos();
    const updated = [doc, ...current.filter(d => d.codigoDocumento !== doc.codigoDocumento)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Erro ao salvar documento', e);
  }
}

export function searchDocumento(query: string): DocumentoSST | null {
  if (!query) return null;
  const clean = query.trim().toLowerCase();
  const docs = getDocumentos();
  
  // Direct exact code match
  const exact = docs.find(d => d.codigoDocumento.toLowerCase() === clean);
  if (exact) return exact;

  // Code starts with / partial UUID match
  const partial = docs.find(d => 
    d.codigoDocumento.toLowerCase().includes(clean) ||
    clean.includes(d.codigoDocumento.toLowerCase()) ||
    (d.sha256 && d.sha256.toLowerCase().startsWith(clean))
  );
  if (partial) return partial;

  // Fallback match by CPF or Name if searched specifically
  const byCpf = docs.find(d => d.cpf.replace(/\D/g, '') === clean.replace(/\D/g, '') && clean.replace(/\D/g, '').length >= 11);
  if (byCpf) return byCpf;

  return null;
}

export function saveHistoricoConsulta(item: { codigo: string; tipoDocumento: string; trabalhador: string; statusTipo: 'valido' | 'vencido' | 'revogado' }) {
  try {
    const currentRaw = localStorage.getItem(HISTORY_KEY);
    const list = currentRaw ? JSON.parse(currentRaw) : [];
    const updated = [
      {
        ...item,
        dataConsulta: new Date().toLocaleString('pt-BR')
      },
      ...list.filter((x: any) => x.codigo !== item.codigo)
    ].slice(0, 10);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
}

export function getHistoricoConsultas() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
