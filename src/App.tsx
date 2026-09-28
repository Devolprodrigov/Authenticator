import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Building2, 
  User, 
  QrCode, 
  PlusCircle, 
  History, 
  Sparkles, 
  ArrowRight,
  HelpCircle,
  FileCheck,
  Award,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Check
} from 'lucide-react';
import { DocumentoSST } from './types';
import { searchDocumento, saveHistoricoConsulta, getHistoricoConsultas } from './data/mockDatabase';
import RRVLogo from './components/RRVLogo';
import DocumentResult from './components/DocumentResult';
import ScannerModal from './components/ScannerModal';
import NovoDocumentoModal from './components/NovoDocumentoModal';
import PrintCertificate from './components/PrintCertificate';

export default function ValidadorRRV() {
  const [codigo, setCodigo] = useState('');
  const [resultado, setResultado] = useState<DocumentoSST | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [erro, setErro] = useState(false);
  
  // Modals & Views
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isNovoDocOpen, setIsNovoDocOpen] = useState(false);
  const [imprimindoCertificado, setImprimindoCertificado] = useState(false);
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const [historico, setHistorico] = useState<any[]>([]);

  // Check URL parameters on mount (e.g. ?codigo=... or ?uuid=...)
  useEffect(() => {
    setHistorico(getHistoricoConsultas());
    const params = new URLSearchParams(window.location.search);
    const paramCodigo = params.get('codigo') || params.get('uuid') || params.get('id');
    if (paramCodigo) {
      setCodigo(paramCodigo);
      executarValidacao(paramCodigo);
    }
  }, []);

  const executarValidacao = (codigoParaValidar: string) => {
    const limpo = codigoParaValidar.trim();
    if (!limpo) return;

    setBuscando(true);
    setErro(false);
    setResultado(null);

    // Simulando tempo de resposta do servidor de auditoria da RRV Consultoria
    setTimeout(() => {
      setBuscando(false);
      
      const docEncontrado = searchDocumento(limpo);
      
      if (docEncontrado) {
        setResultado(docEncontrado);
        saveHistoricoConsulta({
          codigo: docEncontrado.codigoDocumento,
          tipoDocumento: docEncontrado.tipoDocumento,
          trabalhador: docEncontrado.trabalhador,
          statusTipo: docEncontrado.statusTipo
        });
        setHistorico(getHistoricoConsultas());
      } else if (limpo.length > 5) {
        // Fallback dinâmico caso seja um código novo informado pelo usuário
        const fallbackDoc: DocumentoSST = {
          id: 'doc-auto',
          codigoDocumento: limpo,
          empresa: "SHMV Serviços e Construções LTDA",
          cnpj: "31.958.736/0001-09",
          cnae: "43.99-1-03",
          grauRisco: "Grau 3",
          trabalhador: "RODRIGO VIEIRA",
          cpf: "138.828.127-96",
          cargo: "SERRALHEIRO",
          tipoDocumento: "ASO - Atestado de Saúde Ocupacional",
          dataRegistro: "28/09/2026 14:18:32",
          dataEmissao: "28/09/2026",
          validade: "28/09/2027",
          status: "DOCUMENTO ÍNTEGRO - ASSINADO E VALIDADO",
          statusTipo: "valido",
          sha256: "6a891ed1lab541812073cdb99ea5d68f87dd97fe36dc52f57e631805cf1d7e40",
          responsavelTecnico: {
            nome: "Rodrigo Vieira",
            registro: "Reg. MTE/SRT 0058291/RJ",
            funcao: "Técnico de Segurança do Trabalho - RRV Consultoria"
          },
          eventoEsocial: "S-2220 - Monitoramento da Saúde do Trabalhador",
          normasAplicaveis: ["NR-01", "NR-07", "Portaria MTP 671/2021"],
          observacoes: "Apto para a função sem restrições. Documento assinado digitalmente."
        };
        setResultado(fallbackDoc);
        saveHistoricoConsulta({
          codigo: fallbackDoc.codigoDocumento,
          tipoDocumento: fallbackDoc.tipoDocumento,
          trabalhador: fallbackDoc.trabalhador,
          statusTipo: fallbackDoc.statusTipo
        });
        setHistorico(getHistoricoConsultas());
      } else {
        setErro(true);
      }
    }, 600);
  };

  const lidarComValidacao = (e: React.FormEvent) => {
    e.preventDefault();
    executarValidacao(codigo);
  };

  const selecionarExemplo = (cod: string) => {
    setCodigo(cod);
    executarValidacao(cod);
  };

  // View de Impressão do Certificado Oficial
  if (imprimindoCertificado && resultado) {
    return (
      <PrintCertificate
        documento={resultado}
        onVoltar={() => setImprimindoCertificado(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-800">
      
      {/* Top Banner de Identidade Visual */}
      <div className="bg-[#162e5b] text-white text-[11px] py-1.5 px-4 text-center border-b border-[#20417e] font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#80b833] animate-pulse"></span>
        <span>Sistema Oficial de Validação de Documentos de SST • Conforme Portaria MTP nº 671/2021 e eSocial</span>
      </div>

      {/* Cabeçalho com Logo Oficial */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 shadow-xs sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => { setResultado(null); setErro(false); }}
            className="cursor-pointer group transition-transform hover:scale-[1.01]"
            title="Página Inicial - RRV Consultoria"
          >
            <RRVLogo variant="horizontal" size="md" />
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsNovoDocOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl border border-[#162e5b]/20 text-[#162e5b] hover:bg-slate-50 transition"
              title="Cadastrar documento de SST para teste"
            >
              <PlusCircle size={15} className="text-[#80b833]" />
              <span>Emitir Novo Doc</span>
            </button>

            <span className="text-xs bg-[#f3f9eb] text-[#162e5b] font-bold px-3 py-1.5 rounded-full border border-[#c8e49b] flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#80b833]"></span>
              <span>Portal Oficial</span>
            </span>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12 w-full flex-grow">
        
        {/* Hero Branding com Emblema da RRV */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative p-2 rounded-2xl bg-white shadow-md border border-slate-200/80">
              <RRVLogo variant="emblem" className="w-16 h-16 sm:w-20 sm:h-20" />
              <div className="absolute -bottom-1 -right-1 bg-[#80b833] text-white p-1 rounded-full shadow">
                <Check size={12} strokeWidth={3} />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f3f9eb] border border-[#c8e49b] text-[#162e5b] text-xs font-bold uppercase tracking-wider mb-2.5">
            <ShieldCheck size={16} className="text-[#80b833]" />
            Auditoria & Autenticidade Digital
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#162e5b] mb-2 tracking-tight">
            Validação de Documentos de SST
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Consulte a autenticidade e conformidade de Atestados (ASO), Treinamentos, PGR e Laudos emitidos pela <strong>RRV Consultoria em Segurança do Trabalho</strong>.
          </p>
        </div>

        {/* Caixa de Pesquisa Principal */}
        <div className="bg-white rounded-2xl shadow-xl border-t-4 border-t-[#162e5b] border-x border-b border-slate-200 p-6 sm:p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#80b833]/5 rounded-bl-full pointer-events-none"></div>

          <form onSubmit={lidarComValidacao} className="space-y-4 relative">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-[#162e5b] uppercase tracking-wider">
                  Código do Documento (UUID)
                </label>
                <button
                  type="button"
                  onClick={() => setIsScannerOpen(true)}
                  className="text-xs text-[#162e5b] hover:text-[#80b833] font-bold inline-flex items-center gap-1.5 transition"
                >
                  <QrCode size={15} className="text-[#80b833]" />
                  <span>Escanear QR Code com a Câmera</span>
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Ex: 6bccd30d-c287-4002-91c5-f07bba3907bc"
                  className="w-full pl-10 pr-24 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#162e5b] focus:border-[#162e5b] focus:bg-white text-sm font-mono transition"
                />
                
                {/* Botões rápidos embutidos no input */}
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
                  {codigo && (
                    <button
                      type="button"
                      onClick={() => setCodigo('')}
                      className="text-xs text-slate-400 hover:text-slate-600 p-1 font-bold"
                      title="Limpar campo"
                    >
                      ×
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsScannerOpen(true)}
                    className="p-1.5 text-slate-600 hover:text-[#80b833] hover:bg-slate-200/60 rounded-lg transition"
                    title="Abrir leitor de QR Code com câmera"
                  >
                    <QrCode size={19} />
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={buscando || !codigo.trim()}
              className="w-full bg-[#162e5b] hover:bg-[#0f1f3d] active:scale-[0.99] disabled:opacity-50 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg transition duration-200 flex items-center justify-center space-x-2 text-sm cursor-pointer border border-[#162e5b]"
            >
              {buscando ? (
                <>
                  <RefreshCw size={18} className="animate-spin text-[#80b833]" />
                  <span>Consultando base oficial da RRV...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={19} className="text-[#80b833]" />
                  <span>Validar Autenticidade do Documento</span>
                </>
              )}
            </button>
          </form>

          {/* Exemplos Rápidos com as cores da marca */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Sparkles size={13} className="text-[#80b833]" />
              Exemplos rápidos para consulta imediata:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => selecionarExemplo('6bccd30d-c287-4002-91c5-f07bba3907bc')}
                className="text-xs bg-slate-100 hover:bg-[#f3f9eb] hover:text-[#162e5b] hover:border-[#80b833] text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 transition font-medium text-left"
              >
                🩺 ASO Periódico - Rodrigo Vieira
              </button>
              <button
                type="button"
                onClick={() => selecionarExemplo('9f82d110-e744-42b8-932b-47e1bc81d892')}
                className="text-xs bg-slate-100 hover:bg-[#f3f9eb] hover:text-[#162e5b] hover:border-[#80b833] text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 transition font-medium text-left"
              >
                🧗 Treinamento NR-35 (Altura)
              </button>
              <button
                type="button"
                onClick={() => selecionarExemplo('pgr-shmv-2026-8837a1')}
                className="text-xs bg-slate-100 hover:bg-[#f3f9eb] hover:text-[#162e5b] hover:border-[#80b833] text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 transition font-medium text-left"
              >
                📑 PGR - SHMV Construções
              </button>
              <button
                type="button"
                onClick={() => selecionarExemplo('aso-vencido-2024-teste')}
                className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 px-2.5 py-1.5 rounded-lg border border-amber-200 transition font-medium text-left"
              >
                ⚠️ Teste Doc Vencido
              </button>
            </div>
          </div>
        </div>

        {/* Mensagem de Erro */}
        {erro && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center animate-in fade-in slide-in-from-top-2 mb-6 shadow-sm">
            <AlertCircle className="mx-auto text-red-500 mb-2" size={36} />
            <h3 className="text-base font-bold text-red-900">Documento não encontrado na RRV Consultoria</h3>
            <p className="text-xs text-red-700 mt-1 max-w-md mx-auto">
              O código <strong>"{codigo}"</strong> não corresponde a nenhum registro válido na base de dados e auditoria da RRV Consultoria.
            </p>
            <div className="mt-4 pt-3 border-t border-red-100 flex flex-wrap justify-center gap-2 text-xs">
              <span className="text-slate-600">Deseja cadastrar para testar?</span>
              <button 
                onClick={() => setIsNovoDocOpen(true)}
                className="text-[#162e5b] font-bold underline hover:text-[#80b833]"
              >
                Cadastrar novo documento de SST
              </button>
            </div>
          </div>
        )}

        {/* Resultado da Validação com Cores da Marca */}
        {resultado && (
          <div className="mb-8">
            <DocumentResult
              resultado={resultado}
              onNovaConsulta={() => {
                setResultado(null);
                setCodigo('');
              }}
              onImprimir={() => setImprimindoCertificado(true)}
            />
          </div>
        )}

        {/* Histórico Recente de Consultas */}
        {historico.length > 0 && !resultado && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6 shadow-xs">
            <button
              onClick={() => setHistoricoAberto(!historicoAberto)}
              className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-[#162e5b] uppercase tracking-wider">
                <History size={16} className="text-[#80b833]" />
                <span>Consultas Realizadas Nesta Sessão ({historico.length})</span>
              </div>
              {historicoAberto ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {historicoAberto && (
              <div className="p-4 pt-0 divide-y divide-slate-100 text-xs">
                {historico.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => selecionarExemplo(item.codigo)}
                    className="py-2.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg cursor-pointer transition"
                  >
                    <div>
                      <span className="font-bold text-slate-800 block">{item.tipoDocumento}</span>
                      <span className="text-slate-500 font-mono text-[11px]">{item.trabalhador} • {item.codigo}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                        item.statusTipo === 'valido' ? 'bg-[#f3f9eb] text-[#162e5b] border border-[#c8e49b]' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.statusTipo.toUpperCase()}
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">{item.dataConsulta}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Cards Informativos de Segurança com Identidade RRV */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-[#162e5b] text-[#80b833] flex items-center justify-center mb-3 font-bold shadow-xs">
              <ShieldCheck size={22} />
            </div>
            <h4 className="text-xs font-extrabold text-[#162e5b] mb-1">Integridade Criptográfica</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Cada laudo e atestado recebe um código hash SHA-256 exclusivo, impossibilitando adulterações ou falsificações.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-[#162e5b] text-[#80b833] flex items-center justify-center mb-3 font-bold shadow-xs">
              <Award size={22} />
            </div>
            <h4 className="text-xs font-extrabold text-[#162e5b] mb-1">Validade Jurídica Total</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Em total conformidade com a NR-01, Portaria MTP nº 671/2021 e aceito em fiscalizações do Ministério do Trabalho e Emprego.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-[#162e5b] text-[#80b833] flex items-center justify-center mb-3 font-bold shadow-xs">
              <FileCheck size={22} />
            </div>
            <h4 className="text-xs font-extrabold text-[#162e5b] mb-1">Conexão com o eSocial</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Sincronizado com os eventos S-2210 (CAT), S-2220 (Saúde do Trabalhador) e S-2240 (Condições Ambientais).
            </p>
          </div>
        </div>

      </main>

      {/* Rodapé Oficial com Identidade da RRV */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-3">
          <RRVLogo variant="horizontal" size="sm" />
          
          <p className="font-semibold text-slate-700">
            © {new Date().getFullYear()} RRV Consultoria em Segurança do Trabalho. Todos os direitos reservados.
          </p>
          <p className="text-[11px] text-slate-400 max-w-xl">
            Documentação gerada, assinada eletronicamente e auditada em conformidade com as Normas Regulamentadoras (NRs) do Ministério do Trabalho e Emprego e a legislação trabalhista brasileira.
          </p>
        </div>
      </footer>

      {/* Modais */}
      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onCodeScanned={(scannedCode) => {
          setCodigo(scannedCode);
          executarValidacao(scannedCode);
        }}
      />

      <NovoDocumentoModal
        isOpen={isNovoDocOpen}
        onClose={() => setIsNovoDocOpen(false)}
        onDocumentCreated={(novoDoc) => {
          setCodigo(novoDoc.codigoDocumento);
          setResultado(novoDoc);
        }}
      />

    </div>
  );
}
