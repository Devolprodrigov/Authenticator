import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Building2, 
  User, 
  Calendar, 
  ShieldCheck, 
  Copy, 
  Check, 
  Printer, 
  Share2, 
  ExternalLink,
  Award,
  Clock,
  QrCode as QrCodeIcon,
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { DocumentoSST } from '../types';
import RRVLogo from './RRVLogo';

interface DocumentResultProps {
  resultado: DocumentoSST;
  onNovaConsulta: () => void;
  onImprimir: () => void;
}

export default function DocumentResult({ resultado, onNovaConsulta, onImprimir }: DocumentResultProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [mostrarDetalhesTecnicos, setMostrarDetalhesTecnicos] = useState(false);

  useEffect(() => {
    // Generate scannable QR Code pointing to this specific validation link
    const url = `${window.location.origin}${window.location.pathname}?codigo=${encodeURIComponent(resultado.codigoDocumento)}`;
    QRCode.toDataURL(url, {
      width: 200,
      margin: 1,
      color: {
        dark: '#162e5b',
        light: '#ffffff'
      }
    })
      .then(dataUrl => setQrCodeDataUrl(dataUrl))
      .catch(err => console.error('Erro ao gerar QRCode', err));

    // Celebration for valid document
    if (resultado.statusTipo === 'valido') {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#80b833', '#162e5b', '#a3e635', '#1e3a8a']
        });
      } catch (e) {
        // ignore
      }
    }
  }, [resultado.codigoDocumento, resultado.statusTipo]);

  const copiarHash = () => {
    if (!resultado.sha256) return;
    navigator.clipboard.writeText(resultado.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2500);
  };

  const copiarLinkValidacao = () => {
    const url = `${window.location.origin}${window.location.pathname}?codigo=${encodeURIComponent(resultado.codigoDocumento)}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const isValido = resultado.statusTipo === 'valido';
  const isVencido = resultado.statusTipo === 'vencido';

  return (
    <div className={`bg-white rounded-2xl shadow-2xl border-2 ${
      isValido ? 'border-[#80b833]/40' : isVencido ? 'border-amber-300' : 'border-rose-300'
    } overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-2`}>
      
      {/* Top Banner with Brand Navy and Green Accents */}
      <div className={`px-6 py-4.5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md ${
        isValido 
          ? 'bg-gradient-to-r from-[#162e5b] via-[#1a386e] to-[#162e5b] border-b-4 border-b-[#80b833]' 
          : isVencido 
            ? 'bg-gradient-to-r from-amber-700 to-amber-800 border-b-4 border-b-amber-500' 
            : 'bg-gradient-to-r from-rose-800 to-rose-900 border-b-4 border-b-rose-500'
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-xs border border-white/15">
            {isValido ? (
              <CheckCircle2 size={26} className="text-[#80b833]" />
            ) : isVencido ? (
              <AlertTriangle size={26} className="text-amber-300" />
            ) : (
              <XCircle size={26} className="text-rose-300" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-wide">
                {isValido ? 'Autenticidade Confirmada' : isVencido ? 'Documento Expirado / Atenção' : 'Documento Não Conforme'}
              </span>
              <span className="text-[10px] bg-[#80b833] text-[#162e5b] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Auditado RRV
              </span>
            </div>
            <p className="text-xs text-slate-200 font-medium">
              Consulta registrada nos servidores da RRV Consultoria em {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className={`text-xs px-3.5 py-1.5 rounded-lg font-mono font-black tracking-wide uppercase border ${
            isValido 
              ? 'bg-[#80b833] text-[#162e5b] border-[#a3e635]' 
              : isVencido 
                ? 'bg-amber-100 text-amber-900 border-amber-300' 
                : 'bg-rose-100 text-rose-900 border-rose-300'
          }`}>
            {isValido ? '✓ ÍNTEGRO & VÁLIDO' : isVencido ? 'VENCIDO' : 'REVOGADO'}
          </span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Quick action strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-bold text-[#162e5b]">Identificador UUID:</span>
            <span className="font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded select-all font-medium text-xs break-all border border-slate-200">
              {resultado.codigoDocumento}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copiarLinkValidacao}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-[#f3f9eb] hover:text-[#162e5b] hover:border-[#80b833] transition"
              title="Copiar URL direta de validação deste documento"
            >
              {copiedLink ? <Check size={14} className="text-[#80b833]" /> : <Share2 size={14} />}
              <span>{copiedLink ? 'Link Copiado!' : 'Copiar Link'}</span>
            </button>

            <button
              onClick={onImprimir}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-1.5 rounded-xl bg-[#162e5b] text-white hover:bg-[#0f1f3d] transition shadow-md"
              title="Imprimir certidão oficial da RRV"
            >
              <Printer size={14} className="text-[#80b833]" />
              <span>Imprimir Certidão Oficial</span>
            </button>
          </div>
        </div>

        {/* Primary Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Document Type & Details */}
          <div className="bg-slate-50 rounded-xl p-4.5 border border-slate-200/90 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-[#162e5b] text-[#80b833] rounded-xl shrink-0 shadow-2xs">
                <FileText size={20} />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Tipo de Documento
                </span>
                <h3 className="font-black text-[#162e5b] text-sm sm:text-base leading-snug">
                  {resultado.tipoDocumento}
                </h3>
                {resultado.cargaHoraria && (
                  <span className="inline-block mt-1 text-xs font-bold text-[#162e5b] bg-[#f3f9eb] border border-[#c8e49b] px-2 py-0.5 rounded">
                    Carga Horária: {resultado.cargaHoraria}
                  </span>
                )}
                {resultado.eventoEsocial && (
                  <span className="block mt-1.5 text-xs text-slate-600 font-mono">
                    <span className="font-bold text-[#162e5b]">eSocial:</span> {resultado.eventoEsocial}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="bg-slate-50 rounded-xl p-4.5 border border-slate-200/90">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-[#162e5b] text-[#80b833] rounded-xl shrink-0 shadow-2xs">
                <Building2 size={20} />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Empresa Contratante
                </span>
                <h3 className="font-black text-[#162e5b] text-sm leading-snug">
                  {resultado.empresa}
                </h3>
                <p className="text-xs text-slate-600 font-mono mt-0.5">
                  CNPJ: <span className="font-bold text-slate-800">{resultado.cnpj}</span>
                </p>
                {resultado.grauRisco && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    {resultado.grauRisco} {resultado.cnae ? `• CNAE ${resultado.cnae}` : ''}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Worker / Colaborador */}
          <div className="bg-slate-50 rounded-xl p-4.5 border border-slate-200/90">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-[#162e5b] text-[#80b833] rounded-xl shrink-0 shadow-2xs">
                <User size={20} />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Colaborador / Trabalhador
                </span>
                <h3 className="font-black text-[#162e5b] text-sm sm:text-base">
                  {resultado.trabalhador}
                </h3>
                <div className="text-xs text-slate-600 mt-1 space-y-0.5">
                  <p>
                    <span className="text-slate-500">CPF:</span>{' '}
                    <span className="font-mono font-bold text-slate-800">{resultado.cpf}</span>
                    {resultado.matricula && (
                      <span className="text-slate-500 ml-2">Matrícula: {resultado.matricula}</span>
                    )}
                  </p>
                  <p className="text-slate-700 font-medium">
                    <span className="text-slate-500">Cargo / Função:</span> <strong className="text-[#162e5b]">{resultado.cargo}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Responsible / Emission */}
          <div className="bg-slate-50 rounded-xl p-4.5 border border-slate-200/90">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-[#162e5b] text-[#80b833] rounded-xl shrink-0 shadow-2xs">
                <Award size={20} />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Responsável Técnico / Emissor
                </span>
                <h3 className="font-black text-[#162e5b] text-sm">
                  {resultado.responsavelTecnico?.nome || 'RRV Consultoria'}
                </h3>
                <p className="text-xs font-mono font-bold text-slate-700 mt-0.5">
                  {resultado.responsavelTecnico?.registro}
                </p>
                <p className="text-xs text-slate-500">
                  {resultado.responsavelTecnico?.funcao}
                </p>
                {resultado.medicoCoordenador && (
                  <p className="text-xs text-slate-600 mt-1 border-t border-slate-200 pt-1">
                    Coord. PCMSO: <span className="font-bold text-slate-800">{resultado.medicoCoordenador.nome}</span> ({resultado.medicoCoordenador.crm})
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dates & Validity Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/90">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Clock size={14} className="text-[#162e5b]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Data do Registro</span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-800">
              {resultado.dataRegistro}
            </span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/90">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Calendar size={14} className="text-[#162e5b]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Validade Documental</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-black ${isVencido ? 'text-rose-600' : 'text-[#162e5b]'}`}>
                {resultado.validade || 'Vigência indeterminada'}
              </span>
              {isVencido && (
                <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded font-bold">
                  EXPIRADO
                </span>
              )}
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/90">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <ShieldCheck size={14} className="text-[#80b833]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Status de Integridade</span>
            </div>
            <span className={`text-xs font-black ${isValido ? 'text-[#162e5b]' : isVencido ? 'text-amber-700' : 'text-rose-700'}`}>
              {resultado.status}
            </span>
          </div>
        </div>

        {/* Observations (if any) */}
        {resultado.observacoes && (
          <div className="bg-[#f3f9eb]/60 border border-[#c8e49b] rounded-xl p-4 text-xs text-slate-700">
            <span className="font-extrabold text-[#162e5b] block mb-1">Parecer Oficial do Documento:</span>
            <p className="leading-relaxed">{resultado.observacoes}</p>
          </div>
        )}

        {resultado.conteudoProgramatico && resultado.conteudoProgramatico.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <span className="text-xs font-bold text-[#162e5b] uppercase tracking-wider block mb-2">
              Conteúdo Programático Concluído:
            </span>
            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
              {resultado.conteudoProgramatico.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* SHA-256 Hash and Scannable QR Code */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0f1f3d] text-slate-100 rounded-2xl p-4 sm:p-5 border border-[#162e5b]">
            <div className="w-full sm:flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-[#80b833]" />
                  Hash SHA-256 de Integridade Criptográfica
                </span>
                <button
                  onClick={copiarHash}
                  className="text-xs text-slate-200 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition"
                  title="Copiar Hash SHA-256"
                >
                  {copiedHash ? <Check size={13} className="text-[#80b833]" /> : <Copy size={13} />}
                  <span>{copiedHash ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>

              <div className="font-mono text-[11px] sm:text-xs text-[#80b833] bg-[#091326] p-3 rounded-xl break-all border border-[#162e5b] select-all">
                {resultado.sha256}
              </div>

              <p className="text-[11px] text-slate-400 leading-tight">
                Em conformidade com a <strong>Portaria MTP nº 671/2021</strong> e legislação de assinatura digital eletrônica. Qualquer alteração no arquivo PDF original invalidará esta assinatura criptográfica.
              </p>
            </div>

            {/* QR Code preview */}
            {qrCodeDataUrl && (
              <div className="flex flex-col items-center shrink-0 bg-white p-3 rounded-2xl shadow-lg border border-slate-200">
                <img 
                  src={qrCodeDataUrl} 
                  alt="QR Code de Validação" 
                  className="w-24 h-24 sm:w-28 sm:h-28"
                />
                <span className="text-[9px] font-black text-[#162e5b] uppercase tracking-tight mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#80b833]"></span>
                  Validação Mobile
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Normative Compliance Footnote */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 gap-2">
          <div className="flex items-center gap-2">
            <RRVLogo variant="emblem" className="w-5 h-5" />
            <span>Documento emitido e autenticado pela <strong>RRV Consultoria em Segurança do Trabalho</strong></span>
          </div>

          <button
            onClick={() => setMostrarDetalhesTecnicos(!mostrarDetalhesTecnicos)}
            className="text-[#162e5b] hover:text-[#80b833] font-bold underline text-xs transition"
          >
            {mostrarDetalhesTecnicos ? 'Ocultar detalhes legais' : 'Ver bases normativas'}
          </button>
        </div>

        {mostrarDetalhesTecnicos && (
          <div className="bg-[#f3f9eb]/50 border border-[#c8e49b] rounded-xl p-4 text-xs text-slate-700 space-y-2 animate-in fade-in">
            <h4 className="font-extrabold text-[#162e5b]">Fundamentação Jurídica & Técnica Aplicada:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>NR-01 (Portaria SEPRT nº 6.730/2020):</strong> Gerenciamento de Riscos Ocupacionais (GRO) e guarda de documentos em meio digital.</li>
              <li><strong>Portaria MTP nº 671/2021:</strong> Assinatura e autenticação de livros, certidões e termos de inspeção do trabalho com certificado digital padrão ICP-Brasil.</li>
              <li><strong>NR-07 (Portaria MTP nº 427/2021):</strong> Diretrizes para emissão e validação do Atestado de Saúde Ocupacional (ASO).</li>
              <li><strong>Sistema eSocial:</strong> Compatível com transmissão dos eventos periódicos e de tabela S-2220 / S-2240.</li>
            </ul>
          </div>
        )}

        {/* Bottom Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <button
            onClick={onNovaConsulta}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition"
          >
            Consultar Outro Documento
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onImprimir}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#162e5b] hover:bg-[#0f1f3d] text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 border border-[#162e5b]"
            >
              <Printer size={16} className="text-[#80b833]" />
              <span>Imprimir Certidão Oficial</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
