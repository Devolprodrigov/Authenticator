import React, { useEffect, useState } from 'react';
import { ShieldCheck, Printer, ArrowLeft, CheckCircle2 } from 'lucide-react';
import QRCode from 'qrcode';
import { DocumentoSST } from '../types';
import RRVLogo from './RRVLogo';

interface PrintCertificateProps {
  documento: DocumentoSST;
  onVoltar: () => void;
}

export default function PrintCertificate({ documento, onVoltar }: PrintCertificateProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    const url = `${window.location.origin}${window.location.pathname}?codigo=${encodeURIComponent(documento.codigoDocumento)}`;
    QRCode.toDataURL(url, {
      width: 180,
      margin: 1,
      color: { dark: '#162e5b', light: '#ffffff' }
    })
      .then(url => setQrCodeDataUrl(url))
      .catch(console.error);
  }, [documento.codigoDocumento]);

  const dispararImpressao = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 font-sans text-slate-800">
      {/* Top action bar - hidden during print */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <button
          onClick={onVoltar}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-200 hover:bg-slate-50 transition"
        >
          <ArrowLeft size={16} />
          <span>Voltar ao Portal</span>
        </button>

        <button
          onClick={dispararImpressao}
          className="inline-flex items-center gap-2 text-sm font-extrabold text-white bg-[#162e5b] hover:bg-[#0f1f3d] px-5 py-2.5 rounded-xl shadow-md transition"
        >
          <Printer size={16} className="text-[#80b833]" />
          <span>Imprimir / Salvar PDF</span>
        </button>
      </div>

      {/* Official Certificate Paper Container */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-300 p-8 sm:p-12 print:p-6 print:border-none print:shadow-none print:m-0">
        
        {/* Certificate Header with Official RRV Logo */}
        <div className="border-b-2 border-[#162e5b] pb-6 mb-6 flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <RRVLogo variant="emblem" className="w-16 h-16" />
            <div>
              <h1 className="text-xl font-black text-[#162e5b] tracking-tight">
                RRV CONSULTORIA
              </h1>
              <p className="text-xs font-extrabold text-[#80b833] uppercase tracking-wider">
                Segurança do Trabalho e Tecnologia Ocupacional
              </p>
              <p className="text-[11px] text-slate-500">
                Sistema Informatizado de Gestão de SST e Validação de Conformidade
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] bg-[#f3f9eb] border border-[#c8e49b] px-3 py-1 rounded font-mono font-bold text-[#162e5b] block">
              CERTIDÃO Nº {documento.id.toUpperCase()}
            </span>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Emissão: {new Date().toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="text-center my-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f3f9eb] border border-[#c8e49b] text-[#162e5b] font-extrabold text-xs uppercase tracking-widest mb-3">
            <CheckCircle2 size={16} className="text-[#80b833]" />
            Certidão de Autenticidade e Integridade Documental
          </div>
          <h2 className="text-2xl font-black text-[#162e5b] tracking-tight uppercase">
            Comprovante Oficial de Validação de SST
          </h2>
          <p className="text-xs text-slate-600 max-w-xl mx-auto mt-2">
            Atestamos para os devidos fins de direito, auditoria trabalhista e previdenciária que o documento abaixo especificado encontra-se regularmente cadastrado, assinado digitalmente e registrado na base oficial de dados da <strong>RRV Consultoria em Segurança do Trabalho</strong>.
          </p>
        </div>

        {/* Certificate Details Table */}
        <div className="border border-slate-300 rounded-xl overflow-hidden mb-6 text-xs">
          <div className="bg-[#162e5b] text-white px-4 py-2 font-bold uppercase tracking-wider flex items-center justify-between">
            <span>1. Identificação do Documento Auditado</span>
            <span className="text-[10px] text-[#80b833] font-bold">CONFORME</span>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 bg-white">
            <div>
              <span className="text-slate-400 block font-semibold">TIPO DE DOCUMENTO</span>
              <span className="font-black text-[#162e5b] text-sm">{documento.tipoDocumento}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">CÓDIGO IDENTIFICADOR (UUID)</span>
              <span className="font-mono font-bold text-slate-800 text-xs break-all">{documento.codigoDocumento}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">DATA E HORA DO REGISTRO</span>
              <span className="font-mono text-slate-800">{documento.dataRegistro}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">PRAZO DE VALIDADE</span>
              <span className="font-mono font-bold text-slate-800">{documento.validade || 'Conforme legislação vigente'}</span>
            </div>
          </div>

          <div className="bg-[#162e5b] text-white px-4 py-2 font-bold uppercase tracking-wider border-t border-slate-300">
            2. Dados da Empresa e do Trabalhador
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 bg-white">
            <div>
              <span className="text-slate-400 block font-semibold">RAZÃO SOCIAL DO EMPREGADOR</span>
              <span className="font-bold text-slate-900">{documento.empresa}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">CNPJ</span>
              <span className="font-mono font-bold text-slate-800">{documento.cnpj}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">COLABORADOR / TRABALHADOR</span>
              <span className="font-bold text-slate-900 text-sm">{documento.trabalhador}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">CPF / CARGO</span>
              <span className="font-mono text-slate-800">{documento.cpf} • {documento.cargo}</span>
            </div>
          </div>

          <div className="bg-[#162e5b] text-white px-4 py-2 font-bold uppercase tracking-wider border-t border-slate-300">
            3. Responsabilidade Técnica & Enquadramento Normativo
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 bg-white">
            <div>
              <span className="text-slate-400 block font-semibold">RESPONSÁVEL TÉCNICO EMISSOR</span>
              <span className="font-bold text-slate-900">{documento.responsavelTecnico.nome}</span>
              <span className="block text-[11px] text-slate-600 font-mono">{documento.responsavelTecnico.registro}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">EVENTO / CONFORMIDADE eSOCIAL</span>
              <span className="font-semibold text-slate-800">{documento.eventoEsocial || 'NR-01 / GRO'}</span>
            </div>
          </div>
        </div>

        {/* Cryptographic Seal */}
        <div className="bg-[#f3f9eb]/60 border border-[#c8e49b] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#162e5b]">
              <ShieldCheck size={16} className="text-[#80b833]" />
              <span>Assinatura Digital & Resumo Criptográfico (SHA-256)</span>
            </div>
            <p className="font-mono text-[10px] text-slate-700 bg-white p-2 rounded border border-slate-200 break-all select-all">
              {documento.sha256}
            </p>
            <p className="text-[10px] text-slate-500 leading-tight">
              A autenticidade deste documento é garantida por certificado e assinatura eletrônica em consonância com a Medida Provisória nº 2.200-2/2001 e Portaria MTP nº 671/2021.
            </p>
          </div>

          {qrCodeDataUrl && (
            <div className="shrink-0 text-center bg-white p-2 rounded-lg border border-slate-200 shadow-xs">
              <img src={qrCodeDataUrl} alt="QR Code" className="w-20 h-20 mx-auto" />
              <span className="text-[8px] font-mono text-slate-500 block mt-1">Conferência via QR</span>
            </div>
          )}
        </div>

        {/* Signature Stamp Block */}
        <div className="grid grid-cols-2 gap-8 text-center pt-4 border-t border-slate-200 text-xs">
          <div>
            <div className="h-12 flex items-center justify-center font-serif italic text-[#162e5b] text-base font-semibold">
              Rodrigo Vieira
            </div>
            <div className="border-t border-slate-400 pt-1">
              <span className="font-bold text-slate-800 block">RRV Consultoria em SST</span>
              <span className="text-[10px] text-slate-500">Coordenação Técnica e Auditoria</span>
            </div>
          </div>

          <div>
            <div className="h-12 flex items-center justify-center">
              <span className="text-[10px] font-mono bg-[#f3f9eb] text-[#162e5b] px-3 py-1 rounded border border-[#c8e49b] font-extrabold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#80b833]"></span>
                VALIDADO DIGITALMENTE
              </span>
            </div>
            <div className="border-t border-slate-400 pt-1">
              <span className="font-bold text-slate-800 block">Selo de Integridade Digital</span>
              <span className="text-[10px] text-slate-500">Hash SHA-256 e Registro Auditado</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-400 text-center space-y-0.5">
          <p>Portal Oficial de Validação: rrvconsultoria.com.br/validar</p>
          <p>Documento emitido eletronicamente pela RRV Consultoria em Segurança do Trabalho. UUID: {documento.codigoDocumento}.</p>
        </div>

      </div>
    </div>
  );
}
