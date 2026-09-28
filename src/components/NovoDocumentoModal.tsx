import React, { useState } from 'react';
import { X, PlusCircle, ShieldCheck, FileText, Check } from 'lucide-react';
import { DocumentoSST } from '../types';
import { generateSHA256, generateUUID } from '../utils/crypto';
import { saveDocumento } from '../data/mockDatabase';
import RRVLogo from './RRVLogo';

interface NovoDocumentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentCreated: (doc: DocumentoSST) => void;
}

export default function NovoDocumentoModal({ isOpen, onClose, onDocumentCreated }: NovoDocumentoModalProps) {
  const [empresa, setEmpresa] = useState('SHMV Serviços e Construções LTDA');
  const [cnpj, setCnpj] = useState('31.958.736/0001-09');
  const [trabalhador, setTrabalhador] = useState('RODRIGO VIEIRA');
  const [cpf, setCpf] = useState('138.828.127-96');
  const [cargo, setCargo] = useState('SERRALHEIRO');
  const [tipoDocumento, setTipoDocumento] = useState('ASO - Atestado de Saúde Ocupacional (Periódico)');
  const [responsavelNome, setResponsavelNome] = useState('Rodrigo Vieira');
  const [responsavelReg, setResponsavelReg] = useState('Reg. MTE/SRT 0058291/RJ');
  const [validadeAnos, setValidadeAnos] = useState('1');
  const [observacoes, setObservacoes] = useState('Apto para as atividades normais da função sem restrições.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trabalhador.trim() || !empresa.trim()) return;

    setIsSubmitting(true);
    const uuid = generateUUID();
    const dataRegistro = new Date().toLocaleString('pt-BR');
    const dataEmissao = new Date().toLocaleDateString('pt-BR');
    
    // Calculate validity date
    const d = new Date();
    d.setFullYear(d.getFullYear() + parseInt(validadeAnos || '1', 10));
    const validade = d.toLocaleDateString('pt-BR');

    // Generate real SHA-256
    const payload = `${uuid}-${empresa}-${cnpj}-${trabalhador}-${cpf}-${tipoDocumento}-${dataRegistro}`;
    const sha256 = await generateSHA256(payload);

    const novoDoc: DocumentoSST = {
      id: `doc-${Date.now()}`,
      codigoDocumento: uuid,
      empresa,
      cnpj,
      trabalhador: trabalhador.toUpperCase(),
      cpf,
      cargo: cargo.toUpperCase(),
      tipoDocumento,
      dataRegistro,
      dataEmissao,
      validade,
      status: 'DOCUMENTO ÍNTEGRO - ASSINADO E VALIDADO',
      statusTipo: 'valido',
      sha256,
      responsavelTecnico: {
        nome: responsavelNome,
        registro: responsavelReg,
        funcao: 'Técnico de Segurança do Trabalho / Auditor RRV'
      },
      eventoEsocial: tipoDocumento.includes('ASO') ? 'S-2220 - Saúde do Trabalhador' : 'S-2245 - Treinamentos e Capacitações',
      normasAplicaveis: ['NR-01', tipoDocumento.includes('ASO') ? 'NR-07' : 'NR-35 / NR-10'],
      observacoes
    };

    saveDocumento(novoDoc);
    setIsSubmitting(false);
    onDocumentCreated(novoDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f1f3d]/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#162e5b] text-white">
          <div className="flex items-center space-x-2.5 font-bold text-base">
            <RRVLogo variant="emblem" className="w-6 h-6" />
            <span>Cadastrar / Emitir Documento SST</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="bg-[#f3f9eb] border border-[#c8e49b] rounded-xl p-3.5 text-xs text-[#162e5b]">
            Cadastre um novo ASO, Certificado ou Laudo. Um código <strong>UUID</strong> único e a assinatura <strong>SHA-256</strong> serão calculados automaticamente para validação imediata no portal oficial da <strong>RRV Consultoria</strong>.
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#162e5b] mb-1 uppercase">
                Tipo de Documento
              </label>
              <select
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-[#162e5b] outline-none font-medium"
              >
                <option value="ASO - Atestado de Saúde Ocupacional (Admissional)">ASO - Atestado de Saúde Ocupacional (Admissional)</option>
                <option value="ASO - Atestado de Saúde Ocupacional (Periódico)">ASO - Atestado de Saúde Ocupacional (Periódico)</option>
                <option value="Certificado de Capacitação NR-35 - Trabalho em Altura (8h)">Certificado de Capacitação NR-35 - Trabalho em Altura (8h)</option>
                <option value="Certificado de Treinamento NR-10 - Segurança em Eletricidade (40h)">Certificado de Treinamento NR-10 - Segurança em Eletricidade (40h)</option>
                <option value="Certificado de Capacitação NR-33 - Espaço Confinado (16h)">Certificado de Capacitação NR-33 - Espaço Confinado (16h)</option>
                <option value="OS - Ordem de Serviço de Segurança do Trabalho (NR-01)">OS - Ordem de Serviço de Segurança do Trabalho (NR-01)</option>
                <option value="PGR - Programa de Gerenciamento de Riscos">PGR - Programa de Gerenciamento de Riscos</option>
                <option value="LTCAT - Laudo Técnico das Condições Ambientais">LTCAT - Laudo Técnico das Condições Ambientais</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#162e5b] mb-1 uppercase">
                  Empresa Contratante
                </label>
                <input
                  type="text"
                  required
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-[#162e5b] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#162e5b] mb-1 uppercase">
                  CNPJ da Empresa
                </label>
                <input
                  type="text"
                  required
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-[#162e5b] outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#162e5b] mb-1 uppercase">
                  Nome do Trabalhador
                </label>
                <input
                  type="text"
                  required
                  value={trabalhador}
                  onChange={(e) => setTrabalhador(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-[#162e5b] outline-none uppercase font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#162e5b] mb-1 uppercase">
                  CPF do Trabalhador
                </label>
                <input
                  type="text"
                  required
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-[#162e5b] outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#162e5b] mb-1 uppercase">
                  Função / Cargo
                </label>
                <input
                  type="text"
                  required
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-[#162e5b] outline-none uppercase font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#162e5b] mb-1 uppercase">
                  Validade do Registro
                </label>
                <select
                  value={validadeAnos}
                  onChange={(e) => setValidadeAnos(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-[#162e5b] outline-none"
                >
                  <option value="1">1 Ano (Padrão ASO)</option>
                  <option value="2">2 Anos (Treinamento NR-35 / NR-10)</option>
                  <option value="0.5">6 Meses</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#162e5b] mb-1 uppercase">
                  Responsável Técnico
                </label>
                <input
                  type="text"
                  value={responsavelNome}
                  onChange={(e) => setResponsavelNome(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-[#162e5b] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#162e5b] mb-1 uppercase">
                  Registro MTE / Conselho
                </label>
                <input
                  type="text"
                  value={responsavelReg}
                  onChange={(e) => setResponsavelReg(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-[#162e5b] outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#162e5b] mb-1 uppercase">
                Observações / Parecer
              </label>
              <textarea
                rows={2}
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-[#162e5b] outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#162e5b] hover:bg-[#0f1f3d] text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 border border-[#162e5b]"
            >
              <ShieldCheck size={16} className="text-[#80b833]" />
              <span>{isSubmitting ? 'Gerando Hash...' : 'Registrar e Validar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
