// ==========================================================================
// MASTER.JS - Painel do Fundador SaaS (Sistema Master Independente)
// Gestão de Lojas, Dossiê Completo, Catálogo de Planos e Emissor de Contratos
// Fundador: pauloaugusto.silvaborges@gmail.com
// ==========================================================================

const EMAILS_MASTER = [
    'pauloaugusto.silvaborges@gmail.com',
    'fabricadecoresgoiania@gmail.com'
];

let listaLojas = [];
let listaPlanos = [];
let listaSistemas = [];
let buscaAtual = '';
let filtroStatusAtual = 'todos';
let filtroSistemaAtual = 'todos';
let filtroPlanoSistemaAtual = 'todos';
let filtroVencimentoRelatorio = 'atrasados';
let viewAtual = 'lojas';
let lojaDossieAtual = null;

const DADOS_FUNDADOR_PADRAO = {
    nome: 'Paulo Augusto Silva Borges',
    empresa: 'SaaS Master Tecnologia',
    email: 'pauloaugusto.silvaborges@gmail.com',
    whatsapp: '62999999999',
    documento: '',
    cidadeUf: 'Goiânia - GO',
    website: '',
    pixTipo: 'email',
    pixChave: 'pauloaugusto.silvaborges@gmail.com',
    pixTitular: 'Paulo Augusto Silva Borges',
    pixBanco: '',
    outrasFormas: 'PIX (Confirmação Imediata)'
};
let dadosFundadorMaster = { ...DADOS_FUNDADOR_PADRAO };

const SISTEMAS_PADRAO = [
    {
        id: 'fc_gestao',
        nome: 'FC-Gestão',
        ramo: 'Móveis & Varejo',
        icone: 'fa-store',
        cor: 'amber',
        url: '../FC-Gest-o/sistema/',
        status: 'ATIVO',
        descricao: 'Sistema completo para gestão de lojas de móveis, eletro e varejo em geral com PDV e NF-e.'
    },
    {
        id: 'fc_food',
        nome: 'FC-Food',
        ramo: 'Restaurantes & Delivery',
        icone: 'fa-utensils',
        cor: 'emerald',
        url: '../food/',
        status: 'ATIVO',
        descricao: 'PDV gastronômico com comanda, pedidos via WhatsApp e controle de mesas.'
    },
    {
        id: 'fc_barber',
        nome: 'FC-Barber',
        ramo: 'Barbearias & Estética',
        icone: 'fa-scissors',
        cor: 'purple',
        url: '../barber/',
        status: 'ATIVO',
        descricao: 'Gestão de agendamentos online, comissões de barbeiros e fidelidade.'
    }
];

const TODOS_RELATORIOS_SAAS = [
    'rel_dre', 'rel_raio_x', 'rel_top_produtos', 'rel_top_clientes', 'rel_historico_vendas',
    'rel_comissao', 'rel_vendedores', 'rel_curva_abc', 'rel_kardex', 'rel_top_compras',
    'rel_top_fornecedores', 'rel_despesas', 'rel_sugestor_compras', 'rel_evolucao_custos',
    'rel_mapa_calor', 'rel_ia_assistente'
];

const PLANOS_PADRAO = [
    {
        id: 'plano_ultra',
        sistemaId: 'fc_gestao',
        nome: 'Ultra Completo (Franquias & Redes)',
        preco: 349.90,
        ciclo: 'mensal',
        usuarios: 'Usuários Ilimitados',
        limiteUsuarios: 999999,
        produtos: 'Produtos Ilimitados',
        descricao: 'A suíte total definitiva: 100% de todos os módulos liberados, multiusuários ilimitados, IA Gemini irrestrita e suporte VIP 24/7.',
        modulos: ['pdv', 'vendas', 'fiscal', 'estoque', 'financeiro', 'caixa', 'compras', 'relatorios', 'agenda', 'site', 'ia', 'marketing', 'suporte'],
        relatoriosPermitidos: [...TODOS_RELATORIOS_SAAS],
        destaque: false,
        ativo: true
    },
    {
        id: 'plano_enterprise',
        sistemaId: 'fc_gestao',
        nome: 'Enterprise (Gestão + IA Gemini)',
        preco: 249.90,
        ciclo: 'mensal',
        usuarios: 'Até 10 Usuários',
        limiteUsuarios: 10,
        produtos: 'Produtos Ilimitados',
        descricao: 'Pacote avançado com inteligência artificial generativa comercial, relatórios preditivos e atendimento prioritário.',
        modulos: ['pdv', 'vendas', 'fiscal', 'estoque', 'financeiro', 'caixa', 'compras', 'relatorios', 'agenda', 'site', 'ia', 'marketing', 'suporte'],
        relatoriosPermitidos: [...TODOS_RELATORIOS_SAAS],
        destaque: false,
        ativo: true
    },
    {
        id: 'plano_pro',
        sistemaId: 'fc_gestao',
        nome: 'Profissional (Gestão & Financeiro)',
        preco: 169.90,
        ciclo: 'mensal',
        usuarios: 'Até 5 Usuários',
        limiteUsuarios: 5,
        produtos: 'Produtos Ilimitados',
        descricao: 'O equilíbrio perfeito: emissão fiscal, gestão financeira completa, DRE, compras XML e catálogo online.',
        modulos: ['pdv', 'vendas', 'fiscal', 'estoque', 'financeiro', 'caixa', 'compras', 'relatorios', 'agenda', 'site', 'suporte'],
        relatoriosPermitidos: ['rel_dre', 'rel_raio_x', 'rel_top_produtos', 'rel_top_clientes', 'rel_historico_vendas', 'rel_comissao', 'rel_vendedores', 'rel_curva_abc', 'rel_kardex', 'rel_top_compras', 'rel_top_fornecedores', 'rel_despesas', 'rel_sugestor_compras', 'rel_evolucao_custos'],
        destaque: true,
        ativo: true
    },
    {
        id: 'plano_fiscal',
        sistemaId: 'fc_gestao',
        nome: 'Fiscal & Vendas',
        preco: 119.90,
        ciclo: 'mensal',
        usuarios: 'Até 3 Usuários',
        limiteUsuarios: 3,
        produtos: 'Produtos Ilimitados',
        descricao: 'Ideal para comércios que precisam emitir notas fiscais eletrônicas com rapidez e segurança tributária.',
        modulos: ['pdv', 'vendas', 'fiscal', 'estoque', 'caixa', 'suporte'],
        relatoriosPermitidos: ['rel_dre', 'rel_top_produtos', 'rel_historico_vendas', 'rel_comissao'],
        destaque: false,
        ativo: true
    },
    {
        id: 'plano_start',
        sistemaId: 'fc_gestao',
        nome: 'Start (Frente de Caixa)',
        preco: 69.90,
        ciclo: 'mensal',
        usuarios: 'Até 2 Usuários',
        limiteUsuarios: 2,
        produtos: 'Até 500 Produtos',
        descricao: 'Perfeito para microempresas e MEIs que precisam de agilidade em vendas de balcão e controle de caixa.',
        modulos: ['pdv', 'vendas', 'estoque', 'caixa', 'suporte'],
        relatoriosPermitidos: ['rel_top_produtos', 'rel_historico_vendas', 'rel_comissao'],
        destaque: false,
        ativo: true
    }
];


// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(msg, tipo = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const cores = {
        success: 'bg-emerald-500 text-slate-950 border-emerald-400',
        error: 'bg-red-500 text-white border-red-400',
        info: 'bg-amber-500 text-slate-950 border-amber-400'
    };

    const icones = {
        success: 'fa-circle-check',
        error: 'fa-circle-xmark',
        info: 'fa-circle-info'
    };

    toast.className = `flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-2xl text-xs font-bold transition-all transform duration-300 translate-y-2 opacity-0 ${cores[tipo] || cores.info}`;
    toast.innerHTML = `<i class="fa-solid ${icones[tipo] || icones.info} text-sm"></i> <span>${msg}</span>`;

    container.appendChild(toast);
    setTimeout(() => { toast.classList.remove('translate-y-2', 'opacity-0'); }, 10);
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
window.showToast = showToast;

// ==========================================
// UTILITÁRIO: COPIAR PARA ÁREA DE TRANSFERÊNCIA
// ==========================================
function copiarTexto(txt, msg = 'Copiado para a área de transferência!') {
    if (!txt) {
        showToast('Nada para copiar!', 'info');
        return;
    }
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(txt).then(() => {
            showToast(msg, 'success');
        }).catch(() => {
            copiarTextoFallback(txt, msg);
        });
    } else {
        copiarTextoFallback(txt, msg);
    }
}
function copiarTextoFallback(txt, msg) {
    const inp = document.createElement('textarea');
    inp.value = txt;
    inp.style.position = 'fixed';
    inp.style.opacity = '0';
    document.body.appendChild(inp);
    inp.focus();
    inp.select();
    try {
        document.execCommand('copy');
        showToast(msg, 'success');
    } catch(e) {
        showToast('Não foi possível copiar automaticamente.', 'error');
    }
    document.body.removeChild(inp);
}
window.copiarTexto = copiarTexto;


// ==========================================
// INICIALIZAÇÃO E SESSÃO DO FUNDADOR
// ==========================================
window.addEventListener('load', () => {
    const isLoginPage = window.location.pathname.includes('login.html');

    firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
            if (!isLoginPage) window.location.href = 'login.html';
            return;
        }

        const email = (user.email || '').toLowerCase();
        const isMaster = EMAILS_MASTER.includes(email);

        if (!isMaster) {
            if (!isLoginPage) {
                alert('Acesso negado: Este portal é restrito exclusivamente ao Fundador do SaaS.');
                await firebase.auth().signOut();
                window.location.href = 'login.html';
            }
            return;
        }

        if (isLoginPage) {
            window.location.href = 'index.html';
            return;
        }

        // Exibe nome e e-mail
        const elNome = document.getElementById('master-nome-display');
        const elEmail = document.getElementById('master-email-display');
        if (elNome) elNome.innerText = user.displayName || 'Paulo Augusto';
        if (elEmail) elEmail.innerText = email;

        // Carrega dados iniciais do SaaS
        await carregarPerfilFundadorMaster();
        await carregarSistemasMaster();
        await carregarPlanosMaster();
        await carregarTodasAsLojasMaster();
        navegarMaster('lojas');
    });
});

// Ação de Login
async function fazerLoginMaster(e) {
    if (e) e.preventDefault();

    const email = document.getElementById('master-email').value.trim().toLowerCase();
    const pass = document.getElementById('master-senha').value;
    const btn = document.getElementById('btn-entrar-master');

    if (!EMAILS_MASTER.includes(email)) {
        showToast('Este e-mail não possui permissão de Fundador do SaaS.', 'error');
        return;
    }

    try {
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Autenticando...';
        btn.disabled = true;

        await firebase.auth().signInWithEmailAndPassword(email, pass);
        showToast('Login autorizado! Entrando no portal...', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 800);

    } catch (err) {
        btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Acessar Painel Master';
        btn.disabled = false;
        console.error(err);
        if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
            showToast('Senha incorreta! Verifique e tente novamente.', 'error');
        } else {
            showToast('Erro ao entrar: ' + err.message, 'error');
        }
    }
}
window.fazerLoginMaster = fazerLoginMaster;

// Ação de Logout
async function fazerLogoutMaster() {
    try {
        await firebase.auth().signOut();
    } catch(e) {}
    window.location.href = 'login.html';
}
window.fazerLogoutMaster = fazerLogoutMaster;

// ==========================================
// NAVEGAÇÃO ENTRE MÓDULOS (SPA MASTER)
// ==========================================
function navegarMaster(view) {
    viewAtual = view;

    const views = ['lojas', 'planos', 'contratos', 'relatorios', 'sistemas'];
    views.forEach(v => {
        const elView = document.getElementById(`view-${v}`);
        const elBtn = document.getElementById(`nav-btn-${v}`);
        if (elView) elView.classList.add('hidden');
        if (elBtn) {
            elBtn.className = 'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 text-slate-300 transition-colors';
        }
    });

    const activeView = document.getElementById(`view-${view}`);
    const activeBtn = document.getElementById(`nav-btn-${view}`);
    if (activeView) activeView.classList.remove('hidden');
    if (activeBtn) {
        activeBtn.className = 'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all bg-amber-500/15 text-amber-400 border border-amber-500/30';
    }

    // Atualiza cabeçalho
    const elTitulo = document.getElementById('header-titulo-view');
    const elAcoes = document.getElementById('header-acoes-view');

    if (view === 'lojas') {
        if (elTitulo) elTitulo.innerHTML = '<i class="fa-solid fa-chart-pie text-amber-400"></i> Gestão de Lojas & Assinaturas';
        if (elAcoes) {
            elAcoes.innerHTML = `
                <button onclick="carregarTodasAsLojasMaster()" class="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-2">
                    <i class="fa-solid fa-arrows-rotate" id="btn-icon-refresh"></i> Atualizar
                </button>
                <button onclick="abrirModalNovaLoja()" class="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-black transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2">
                    <i class="fa-solid fa-plus"></i> Nova Loja
                </button>
            `;
        }
    } else if (view === 'planos') {
        if (elTitulo) elTitulo.innerHTML = '<i class="fa-solid fa-layer-group text-blue-400"></i> Catálogo de Planos do SaaS';
        if (elAcoes) {
            elAcoes.innerHTML = `
                <button onclick="carregarPlanosMaster()" class="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-2">
                    <i class="fa-solid fa-arrows-rotate"></i> Atualizar
                </button>
                <button onclick="abrirModalPlano()" class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-black transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
                    <i class="fa-solid fa-plus"></i> Novo Plano
                </button>
            `;
        }
    } else if (view === 'contratos') {
        if (elTitulo) elTitulo.innerHTML = '<i class="fa-solid fa-file-contract text-purple-400"></i> Emissor de Contratos SaaS (A4)';
        if (elAcoes) {
            elAcoes.innerHTML = `
                <button onclick="imprimirContratoA4()" class="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-xs font-black transition-all shadow-lg shadow-purple-600/20 flex items-center gap-2">
                    <i class="fa-solid fa-print"></i> Imprimir / PDF
                </button>
            `;
        }
        popularSelectEmpresasContrato();
    } else if (view === 'relatorios') {
        if (elTitulo) elTitulo.innerHTML = '<i class="fa-solid fa-chart-line text-emerald-400"></i> Relatórios Financeiros & Métricas SaaS';
        if (elAcoes) {
            elAcoes.innerHTML = `
                <button onclick="renderizarRelatoriosSaaS()" class="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-2">
                    <i class="fa-solid fa-arrows-rotate"></i> Atualizar
                </button>
                <button onclick="exportarLojasExcel()" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20">
                    <i class="fa-solid fa-file-excel"></i> Exportar Excel
                </button>
                <button onclick="exportarRelatorioSaaSPDF()" class="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20">
                    <i class="fa-solid fa-print"></i> Relatório PDF
                </button>
            `;
        }
        renderizarRelatoriosSaaS();
    } else if (view === 'sistemas') {
        if (elTitulo) elTitulo.innerHTML = '<i class="fa-solid fa-cubes text-cyan-400"></i> Ecossistema de Softwares & Produtos';
        if (elAcoes) {
            elAcoes.innerHTML = `
                <button onclick="carregarSistemasMaster()" class="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-2">
                    <i class="fa-solid fa-arrows-rotate"></i> Atualizar
                </button>
                <button onclick="abrirModalNovoSistema()" class="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl text-xs font-black transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2">
                    <i class="fa-solid fa-plus"></i> Novo Sistema
                </button>
            `;
        }
        renderizarGridSistemasMaster();
    }
}
window.navegarMaster = navegarMaster;

// ==========================================
// MÓDULO 1: GESTÃO DE LOJAS & ASSINATURAS
// ==========================================
async function carregarTodasAsLojasMaster() {
    const corpo = document.getElementById('tabela-lojas-corpo');
    if (!corpo) return;

    const iconRefresh = document.getElementById('btn-icon-refresh');
    if (iconRefresh) iconRefresh.classList.add('fa-spin');

    try {
        // 1. Busca lojas no banco central do SaaS (fcgestao-testes)
        const snap = await firebase.firestore().collection('empresas').get();
        const docsMap = new Map();
        snap.docs.forEach(d => docsMap.set(d.id, { id: d.id, ...d.data(), _origem: 'saas' }));

        // 2. Conecta ao banco da loja em produção (lojafc-a31f9) para garantir sincronização de todas as lojas existentes
        if (window.LOJA_PRODUCAO_CONFIG) {
            try {
                let prodApp = firebase.apps.find(a => a.name === 'lojaProdMasterApp');
                if (!prodApp) {
                    prodApp = firebase.initializeApp(window.LOJA_PRODUCAO_CONFIG, 'lojaProdMasterApp');
                }
                const prodSnap = await prodApp.firestore().collection('empresas').get();
                prodSnap.docs.forEach(pDoc => {
                    const pData = pDoc.data();
                    if (!docsMap.has(pDoc.id)) {
                        docsMap.set(pDoc.id, { id: pDoc.id, ...pData, _origem: 'loja_producao' });
                        // Replica em segundo plano para o banco central do SaaS
                        firebase.firestore().collection('empresas').doc(pDoc.id).set(pData, { merge: true }).catch(() => {});
                    } else {
                        const saasItem = docsMap.get(pDoc.id);
                        if (!saasItem.nomeEmpresa && pData.nomeEmpresa) saasItem.nomeEmpresa = pData.nomeEmpresa;
                        if (!saasItem.nome && pData.nome) saasItem.nome = pData.nome;
                    }
                });
            } catch(pErr) {
                console.warn("[SaaS Master] Aviso ao consultar banco de produção:", pErr.message);
            }
        }

        const docsArray = Array.from(docsMap.values());
        const promessas = docsArray.map(async (data) => {
            const docId = data.id;

            // Busca dados cadastrais da empresa
            let configEmpresa = data.configEmpresa || {};
            try {
                const cfgDoc = await firebase.firestore().collection('empresas').doc(docId).collection('configuracoes').doc('config').get();
                if (cfgDoc.exists && cfgDoc.data().empresa) {
                    configEmpresa = cfgDoc.data().empresa;
                } else if (window.LOJA_PRODUCAO_CONFIG) {
                    const prodApp = firebase.apps.find(a => a.name === 'lojaProdMasterApp');
                    if (prodApp) {
                        const pCfg = await prodApp.firestore().collection('empresas').doc(docId).collection('configuracoes').doc('config').get();
                        if (pCfg.exists && pCfg.data().empresa) configEmpresa = pCfg.data().empresa;
                    }
                }
            } catch(e) {}
            data.configEmpresa = configEmpresa;

            // Busca dados do responsável / dono
            let donoInfo = { nome: 'Não informado', email: 'Não informado', telefone: '' };
            if (data.donoUid) {
                try {
                    const uDoc = await firebase.firestore().collection('usuarios').doc(data.donoUid).get();
                    if (uDoc.exists) donoInfo = uDoc.data();
                } catch(e) {}
            }
            data.donoInfo = donoInfo;

            // Validação de Vencimento e Valores
            if (!data.dataVencimento) {
                const base = data.dataCriacao && data.dataCriacao.toDate ? data.dataCriacao.toDate() : new Date();
                const v = new Date(base);
                v.setDate(v.getDate() + 30);
                data.dataVencimento = v.toISOString().split('T')[0];
            }

            if (data.valorMensalidade === undefined) {
                data.valorMensalidade = 99.00;
            }

            if (!data.whatsapp) {
                data.whatsapp = configEmpresa.telefone || donoInfo.telefone || '';
            }

            // Credenciais e Chaves de Integração
            data.emailAcesso = data.emailAcesso || donoInfo.email || '';
            data.senhaAcesso = data.senhaAcesso || '';
            data.geminiKey = data.geminiKey || configEmpresa.geminiKey || '';

            // Módulos liberados (se não houver personalização, herda módulos padrão do plano)
            if (!data.modulosLiberados || !Array.isArray(data.modulosLiberados) || data.modulosLiberados.length === 0) {
                const planoObj = listaPlanos.find(p => p.id === data.plano || p.id === 'plano_' + String(data.plano).toLowerCase()) || PLANOS_PADRAO[1];
                data.modulosLiberados = planoObj ? [...planoObj.modulos] : ['pdv', 'vendas', 'fiscal', 'estoque', 'financeiro', 'site'];
            }

            // Sistema vinculado (default: fc_gestao)
            data.sistemaId = data.sistemaId || 'fc_gestao';

            return data;
        });

        listaLojas = await Promise.all(promessas);
        atualizarKPIsMaster();
        renderizarTabelaLojasMaster();
        popularSelectEmpresasContrato();
        if (typeof renderizarRelatoriosSaaS === 'function') renderizarRelatoriosSaaS();

    } catch (err) {
        console.error("Erro ao listar lojas:", err);
        corpo.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-10 text-red-400">
                    <i class="fa-solid fa-triangle-exclamation text-2xl mb-2"></i>
                    <p>Erro ao carregar lojas: ${err.message}</p>
                </td>
            </tr>
        `;
    } finally {
        if (iconRefresh) iconRefresh.classList.remove('fa-spin');
    }
}
window.carregarTodasAsLojasMaster = carregarTodasAsLojasMaster;

function atualizarKPIsMaster() {
    const hoje = new Date().toISOString().split('T')[0];
    let total = listaLojas.length;
    let ativas = 0;
    let atrasadas = 0;
    let mrr = 0;

    listaLojas.forEach(loja => {
        const status = loja.status || 'ATIVO';
        const venc = loja.dataVencimento || '';
        const valor = Number(loja.valorMensalidade || 0);

        if (status === 'ATIVO') {
            if (venc && venc < hoje) atrasadas++;
            else ativas++;
            mrr += valor;
        } else if (status === 'PENDENTE') {
            atrasadas++;
        } else if (status === 'TRIAL') {
            if (venc && venc < hoje) atrasadas++;
            else ativas++;
        }
    });

    const elTotal = document.getElementById('kpi-total-lojas');
    const elAtivas = document.getElementById('kpi-lojas-ativas');
    const elAtrasadas = document.getElementById('kpi-lojas-atrasadas');
    const elMrr = document.getElementById('kpi-faturamento-mrr');

    if (elTotal) elTotal.innerText = total;
    if (elAtivas) elAtivas.innerText = ativas;
    if (elAtrasadas) elAtrasadas.innerText = atrasadas;
    if (elMrr) elMrr.innerText = mrr.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function filtrarLojasMaster() {
    const inputBusca = document.getElementById('filtro-busca');
    const selectStatus = document.getElementById('filtro-status');
    const selectSistema = document.getElementById('filtro-sistema');

    buscaAtual = inputBusca ? inputBusca.value.toLowerCase().trim() : '';
    filtroStatusAtual = selectStatus ? selectStatus.value : 'todos';
    filtroSistemaAtual = selectSistema ? selectSistema.value : 'todos';

    renderizarTabelaLojasMaster();
}
window.filtrarLojasMaster = filtrarLojasMaster;

function renderizarTabelaLojasMaster() {
    const corpo = document.getElementById('tabela-lojas-corpo');
    if (!corpo) return;

    const hoje = new Date().toISOString().split('T')[0];

    const filtradas = listaLojas.filter(l => {
        const nome = (l.nomeEmpresa || l.nome || '').toLowerCase();
        const razao = (l.configEmpresa?.nome || '').toLowerCase();
        const cnpj = (l.configEmpresa?.cnpj || l.cnpj || '').toLowerCase();
        const dono = (l.donoInfo?.nome || '').toLowerCase();
        const email = (l.donoInfo?.email || '').toLowerCase();
        const wpp = String(l.whatsapp || '').replace(/\D/g, '');

        const matchBusca = !buscaAtual || nome.includes(buscaAtual) || razao.includes(buscaAtual) || cnpj.includes(buscaAtual) || dono.includes(buscaAtual) || email.includes(buscaAtual) || wpp.includes(buscaAtual);
        const status = l.status || 'ATIVO';
        const matchStatus = filtroStatusAtual === 'todos' || status === filtroStatusAtual;
        const matchSistema = filtroSistemaAtual === 'todos' || (l.sistemaId || 'fc_gestao') === filtroSistemaAtual;

        return matchBusca && matchStatus && matchSistema;
    });

    if (filtradas.length === 0) {
        corpo.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-12 text-slate-500">
                    <i class="fa-solid fa-store-slash text-3xl mb-2"></i>
                    <p>Nenhuma loja encontrada para o filtro atual.</p>
                </td>
            </tr>
        `;
        return;
    }

    corpo.innerHTML = filtradas.map(loja => {
        const nome = loja.nomeEmpresa || loja.nome || 'Loja Sem Nome';
        const razao = loja.configEmpresa?.nome || '';
        const cnpj = loja.configEmpresa?.cnpj || loja.cnpj || '';
        const donoNome = loja.donoInfo?.nome || 'Administrador';
        const donoEmail = loja.donoInfo?.email || 'Sem e-mail';
        const wpp = loja.whatsapp || '';
        const plano = loja.plano || 'PRO';
        const valor = Number(loja.valorMensalidade || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const venc = loja.dataVencimento || '';
        const status = loja.status || 'ATIVO';

        // Badge Vencimento
        let badgeVenc = '';
        if (venc) {
            const d1 = new Date(hoje);
            const d2 = new Date(venc);
            const diffDias = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));

            if (diffDias < 0) {
                badgeVenc = `<span class="inline-flex items-center gap-1 text-[11px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20"><i class="fa-solid fa-triangle-exclamation text-[9px]"></i> Atrasado (${Math.abs(diffDias)}d)</span>`;
            } else if (diffDias <= 5) {
                badgeVenc = `<span class="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20"><i class="fa-solid fa-clock text-[9px]"></i> Vence em ${diffDias}d</span>`;
            } else {
                badgeVenc = `<span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20"><i class="fa-solid fa-check text-[9px]"></i> Em dia (${diffDias}d)</span>`;
            }
        }

        // Badge Status
        let badgeStatus = '';
        if (status === 'ATIVO') badgeStatus = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">🟢 ATIVO</span>`;
        else if (status === 'TRIAL') badgeStatus = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">🟡 TRIAL</span>`;
        else if (status === 'PENDENTE') badgeStatus = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30">🟠 PENDENTE</span>`;
        else if (status === 'BLOQUEADO') badgeStatus = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/30">⛔ BLOQUEADO</span>`;

        const wppLimpo = String(wpp).replace(/\D/g, '');
        const temWpp = wppLimpo.length >= 10;

        // Badge do Sistema / Produto
        const sistemaId = loja.sistemaId || 'fc_gestao';
        const sisObj = listaSistemas.find(s => s.id === sistemaId) || SISTEMAS_PADRAO.find(s => s.id === sistemaId) || { nome: 'FC-Gestão', icone: 'fa-store', cor: 'amber' };
        const corMap = {
            amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
            emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
            blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
            purple: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
            rose: 'bg-rose-500/10 text-rose-400 border-rose-500/25',
            cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25'
        };
        const badgeCor = corMap[sisObj.cor] || corMap.amber;
        const badgeSistema = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide border ${badgeCor}"><i class="fa-solid ${sisObj.icone || 'fa-cubes'} text-[10px]"></i> ${sisObj.nome}</span>`;

        return `
            <tr class="hover:bg-slate-800/40 transition-colors">
                <td class="py-4 px-4">
                    <div class="font-extrabold text-white text-base">${nome}</div>
                    ${razao && razao !== nome ? `<div class="text-xs text-slate-400 truncate max-w-xs">${razao}</div>` : ''}
                    <div class="text-[11px] text-slate-500 font-mono mt-0.5">${cnpj ? 'CNPJ: ' + cnpj : 'ID: ' + loja.id}</div>
                </td>
                <td class="py-4 px-4">
                    ${badgeSistema}
                </td>
                <td class="py-4 px-4">
                    <div class="font-semibold text-slate-200">${donoNome}</div>
                    <div class="text-xs text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                        <i class="fa-solid fa-user text-[10px] text-slate-500"></i>
                        <span>${loja.emailAcesso || donoEmail}</span>
                        ${(loja.emailAcesso || donoEmail) && (loja.emailAcesso || donoEmail) !== 'Sem e-mail' ? `
                            <button onclick="copiarTexto('${loja.emailAcesso || donoEmail}', 'E-mail copiado!')" title="Copiar e-mail" class="text-slate-500 hover:text-amber-400 transition-colors">
                                <i class="fa-solid fa-copy text-[10px]"></i>
                            </button>
                        ` : ''}
                    </div>
                    <div class="text-xs font-mono text-amber-300/90 flex items-center gap-1.5 mt-1">
                        <i class="fa-solid fa-key text-[10px] text-slate-500"></i>
                        <span id="pass-loja-${loja.id}" data-oculta="true">••••••••</span>
                        <button onclick="toggleVisualizarSenhaLoja('${loja.id}')" title="Ver / Ocultar Senha" class="text-slate-400 hover:text-amber-400 transition-colors">
                            <i class="fa-solid fa-eye text-[11px]" id="olho-loja-${loja.id}"></i>
                        </button>
                        ${loja.senhaAcesso ? `
                            <button onclick="copiarTexto('${loja.senhaAcesso}', 'Senha copiada!')" title="Copiar Senha" class="text-slate-400 hover:text-amber-400 transition-colors">
                                <i class="fa-solid fa-copy text-[11px]"></i>
                            </button>
                        ` : ''}
                        <button onclick="abrirModalRedefinirSenha('${loja.id}')" title="Alterar Senha do Cliente" class="text-[10px] font-sans font-bold bg-slate-800/80 hover:bg-slate-700 text-amber-400 hover:text-amber-300 px-1.5 py-0.5 rounded border border-slate-700/80 transition-colors ml-1">
                            <i class="fa-solid fa-pen"></i> Alterar
                        </button>
                    </div>
                    ${temWpp ? `<div class="text-xs text-emerald-400 font-medium mt-1"><i class="fa-brands fa-whatsapp"></i> ${wpp}</div>` : ''}
                </td>
                <td class="py-4 px-4">
                    <div class="font-black text-emerald-400 text-base">${valor}</div>
                    <div class="text-xs text-slate-400 uppercase font-bold">${plano}</div>
                </td>
                <td class="py-4 px-4">
                    <div class="font-medium text-slate-300">${formatarDataBr(venc)}</div>
                    <div class="mt-1">${badgeVenc}</div>
                </td>
                <td class="py-4 px-4 text-center">
                    ${badgeStatus}
                </td>
                <td class="py-4 px-4 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                        <button onclick="abrirDossieEmpresa('${loja.id}')" title="Dossiê / Ficha Completa da Empresa" class="w-8 h-8 rounded-xl bg-amber-500/15 hover:bg-amber-500/30 text-amber-400 flex items-center justify-center transition-all border border-amber-500/20">
                            <i class="fa-solid fa-id-card text-sm"></i>
                        </button>
                        <button onclick="gerarContratoParaLoja('${loja.id}')" title="Emitir Contrato SaaS" class="w-8 h-8 rounded-xl bg-purple-500/15 hover:bg-purple-500/30 text-purple-400 flex items-center justify-center transition-all border border-purple-500/20">
                            <i class="fa-solid fa-file-contract text-sm"></i>
                        </button>
                        <button onclick="enviarCobrancaWhatsAppMaster('${loja.id}')" title="Cobrança no WhatsApp" class="w-8 h-8 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 flex items-center justify-center transition-all border border-emerald-500/20">
                            <i class="fa-brands fa-whatsapp text-base"></i>
                        </button>
                        ${status === 'BLOQUEADO' ? `
                            <button onclick="alternarBloqueioMaster('${loja.id}', 'ATIVO')" title="Desbloquear Loja" class="w-8 h-8 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 flex items-center justify-center transition-all border border-emerald-500/20">
                                <i class="fa-solid fa-lock-open text-sm"></i>
                            </button>
                        ` : `
                            <button onclick="alternarBloqueioMaster('${loja.id}', 'BLOQUEADO')" title="Bloquear Loja" class="w-8 h-8 rounded-xl bg-red-500/15 hover:bg-red-500/30 text-red-400 flex items-center justify-center transition-all border border-red-500/20">
                                <i class="fa-solid fa-lock text-sm"></i>
                            </button>
                        `}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function formatarDataBr(dataIso) {
    if (!dataIso) return 'Não definida';
    const p = dataIso.split('-');
    if (p.length === 3) return `${p[2]}/${p[1]}/${p[0]}`;
    return dataIso;
}

// Disparo de Cobrança WhatsApp do Fundador
function enviarCobrancaWhatsAppMaster(empresaId) {
    const loja = listaLojas.find(l => l.id === empresaId);
    if (!loja) return;

    let wpp = loja.whatsapp || '';
    let wppLimpo = String(wpp).replace(/\D/g, '');

    if (!wppLimpo || wppLimpo.length < 10) {
        const novo = prompt('Informe o WhatsApp do cliente com DDD (Ex: 62999999999):', wpp);
        if (!novo) return;
        loja.whatsapp = novo;
        wppLimpo = String(novo).replace(/\D/g, '');
        firebase.firestore().collection('empresas').doc(empresaId).update({ whatsapp: novo }).catch(console.error);
    }

    if (wppLimpo.length === 10 || wppLimpo.length === 11) {
        wppLimpo = '55' + wppLimpo;
    }

    const nomeLoja = loja.nomeEmpresa || loja.nome || 'Loja';
    const valor = Number(loja.valorMensalidade || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const venc = formatarDataBr(loja.dataVencimento);

    const nomeFundador = dadosFundadorMaster.nome || 'Paulo Augusto';
    const empresaFundador = dadosFundadorMaster.empresa ? `(${dadosFundadorMaster.empresa})` : '';
    const chavePix = dadosFundadorMaster.pixChave || 'pauloaugusto.silvaborges@gmail.com';
    const titularPix = dadosFundadorMaster.pixTitular ? `\n👤 *Favorecido:* ${dadosFundadorMaster.pixTitular}` : '';
    const bancoPix = dadosFundadorMaster.pixBanco ? `\n🏦 *Banco:* ${dadosFundadorMaster.pixBanco}` : '';
    const outrasFormas = dadosFundadorMaster.outrasFormas ? `\n💳 *Outras Opções:* ${dadosFundadorMaster.outrasFormas}` : '';

    const mensagem = `Olá, tudo bem? Aqui é o ${nomeFundador} ${empresaFundador}, responsável pelo sistema da sua empresa!\n\n` +
        `Passando para lembrar da mensalidade da sua loja *${nomeLoja}* no valor de *${valor}*, com vencimento em *${venc}*.\n\n` +
        `🔑 *Chave PIX:* ${chavePix}${titularPix}${bancoPix}${outrasFormas}\n\n` +
        `Após realizar o pagamento, por gentileza envie o comprovante por aqui para mantermos seu acesso 100% ativo!\n\n` +
        `Qualquer dúvida estou à disposição. Abraços!`;

    window.open(`https://wa.me/${wppLimpo}?text=${encodeURIComponent(mensagem)}`, '_blank');
}
window.enviarCobrancaWhatsAppMaster = enviarCobrancaWhatsAppMaster;

// Bloquear / Desbloquear Loja
async function alternarBloqueioMaster(empresaId, novoStatus) {
    const loja = listaLojas.find(l => l.id === empresaId);
    const nome = loja ? (loja.nomeEmpresa || loja.nome) : 'esta loja';

    const acao = novoStatus === 'BLOQUEADO' ? 'BLOQUEAR o acesso de' : 'DESBLOQUEAR e reativar o acesso de';
    if (!confirm(`Tem certeza que deseja ${acao} ${nome}?`)) return;

    try {
        await firebase.firestore().collection('empresas').doc(empresaId).update({
            status: novoStatus,
            ultimaAtualizacaoMaster: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Sincroniza também no banco de produção da loja
        if (window.LOJA_PRODUCAO_CONFIG) {
            try {
                let prodApp = firebase.apps.find(a => a.name === 'lojaProdMasterApp');
                if (!prodApp) prodApp = firebase.initializeApp(window.LOJA_PRODUCAO_CONFIG, 'lojaProdMasterApp');
                await prodApp.firestore().collection('empresas').doc(empresaId).update({
                    status: novoStatus,
                    ultimaAtualizacaoMaster: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch(e) {
                console.warn('Aviso ao sincronizar bloqueio na produção:', e.message);
            }
        }

        if (loja) loja.status = novoStatus;

        atualizarKPIsMaster();
        renderizarTabelaLojasMaster();
        showToast(`Loja ${novoStatus === 'BLOQUEADO' ? 'bloqueada' : 'ativada'} com sucesso!`, 'success');

    } catch (err) {
        console.error(err);
        showToast('Erro: ' + err.message, 'error');
    }
}
window.alternarBloqueioMaster = alternarBloqueioMaster;

// ==========================================
// MÓDULO 2: DOSSIÊ COMPLETO DA EMPRESA & GESTÃO DE ACESSO
// ==========================================
let dossieSenhaVisivel = false;

function toggleVisualizarSenhaLoja(lojaId) {
    const el = document.getElementById(`pass-loja-${lojaId}`);
    const icone = document.getElementById(`olho-loja-${lojaId}`);
    const loja = listaLojas.find(l => l.id === lojaId);
    if (!el || !loja) return;

    const isOculta = el.getAttribute('data-oculta') !== 'false';
    if (isOculta) {
        el.innerText = loja.senhaAcesso || '(Não salva)';
        el.setAttribute('data-oculta', 'false');
        if (icone) {
            icone.classList.remove('fa-eye');
            icone.classList.add('fa-eye-slash');
        }
    } else {
        el.innerText = '••••••••';
        el.setAttribute('data-oculta', 'true');
        if (icone) {
            icone.classList.remove('fa-eye-slash');
            icone.classList.add('fa-eye');
        }
    }
}
window.toggleVisualizarSenhaLoja = toggleVisualizarSenhaLoja;

function toggleVisualizarSenhaDossie() {
    dossieSenhaVisivel = !dossieSenhaVisivel;
    const el = document.getElementById('dossie-cred-senha');
    const icone = document.getElementById('dossie-cred-olho');
    if (!el) return;

    if (dossieSenhaVisivel) {
        el.innerText = lojaDossieAtual?.senhaAcesso || '(Não salva)';
        if (icone) {
            icone.classList.remove('fa-eye');
            icone.classList.add('fa-eye-slash');
        }
    } else {
        el.innerText = '••••••••';
        if (icone) {
            icone.classList.remove('fa-eye-slash');
            icone.classList.add('fa-eye');
        }
    }
}
window.toggleVisualizarSenhaDossie = toggleVisualizarSenhaDossie;

function copiarSenhaDossie() {
    if (!lojaDossieAtual || !lojaDossieAtual.senhaAcesso) {
        showToast('Esta loja ainda não possui senha registrada.', 'info');
        return;
    }
    copiarTexto(lojaDossieAtual.senhaAcesso, 'Senha copiada com sucesso!');
}
window.copiarSenhaDossie = copiarSenhaDossie;

function abrirModalRedefinirSenha(empresaId) {
    const targetId = empresaId || (lojaDossieAtual ? lojaDossieAtual.id : null);
    const loja = listaLojas.find(l => l.id === targetId) || lojaDossieAtual;
    if (!loja) return;

    const modal = document.getElementById('modal-redefinir-senha');
    const inputId = document.getElementById('redefinir-empresa-id');
    const txtNome = document.getElementById('redefinir-loja-nome');
    const txtEmail = document.getElementById('redefinir-loja-email');
    const inputSenha = document.getElementById('redefinir-nova-senha');

    if (inputId) inputId.value = loja.id;
    if (txtNome) txtNome.innerText = loja.nomeEmpresa || loja.nome || 'Loja';
    const emailLogin = loja.emailAcesso || loja.donoInfo?.email || '';
    if (txtEmail) txtEmail.innerText = emailLogin;
    if (inputSenha) inputSenha.value = '';

    if (modal) modal.classList.remove('hidden');
}
window.abrirModalRedefinirSenha = abrirModalRedefinirSenha;

function fecharModalRedefinirSenha() {
    const modal = document.getElementById('modal-redefinir-senha');
    if (modal) modal.classList.add('hidden');
}
window.fecharModalRedefinirSenha = fecharModalRedefinirSenha;

function gerarSenhaAleatoria() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let pass = '';
    for (let i = 0; i < 10; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const inputSenha = document.getElementById('redefinir-nova-senha');
    if (inputSenha) {
        inputSenha.value = pass;
        inputSenha.focus();
    }
}
window.gerarSenhaAleatoria = gerarSenhaAleatoria;

async function confirmarRedefinirSenhaMaster(e) {
    if (e) e.preventDefault();
    const inputId = document.getElementById('redefinir-empresa-id');
    const inputSenha = document.getElementById('redefinir-nova-senha');
    const btn = document.getElementById('btn-salvar-nova-senha');

    if (!inputId || !inputSenha) return;
    const empresaId = inputId.value;
    const novaSenha = inputSenha.value.trim();

    if (novaSenha.length < 6) {
        showToast('A senha deve conter no mínimo 6 caracteres!', 'error');
        return;
    }

    const loja = listaLojas.find(l => l.id === empresaId);
    if (!loja) return;

    try {
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Atualizando...';
        }

        const emailLogin = loja.emailAcesso || loja.donoInfo?.email;
        const senhaAntiga = loja.senhaAcesso;

        // 1. Tentar sincronizar via Firebase Auth secundário caso senha antiga seja conhecida
        if (emailLogin && senhaAntiga) {
            try {
                let secApp;
                try {
                    secApp = firebase.app('SecondaryMaster');
                } catch(e) {
                    secApp = firebase.initializeApp(firebaseConfig, 'SecondaryMaster');
                }
                const cred = await secApp.auth().signInWithEmailAndPassword(emailLogin, senhaAntiga);
                await cred.user.updatePassword(novaSenha);
                await secApp.auth().signOut();
                console.log("Senha sincronizada com Firebase Auth com sucesso!");
            } catch(authErr) {
                console.warn("Aviso ao sincronizar Auth secundário:", authErr);
            }
        }

        // 2. Salva a nova senha na collection empresas/{empresaId}
        await firebase.firestore().collection('empresas').doc(empresaId).set({
            senhaAcesso: novaSenha,
            ultimaAlteracaoSenha: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // 3. Atualiza na memória
        loja.senhaAcesso = novaSenha;
        if (lojaDossieAtual && lojaDossieAtual.id === empresaId) {
            lojaDossieAtual.senhaAcesso = novaSenha;
            const credSenha = document.getElementById('dossie-cred-senha');
            if (credSenha && dossieSenhaVisivel) credSenha.innerText = novaSenha;
        }

        fecharModalRedefinirSenha();
        renderizarTabelaLojasMaster();
        showToast(`Senha da loja "${loja.nomeEmpresa || loja.nome}" redefinida com sucesso!`, 'success');

    } catch (err) {
        console.error("Erro ao redefinir senha:", err);
        showToast('Erro ao redefinir senha: ' + err.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Salvar Nova Senha';
        }
    }
}
window.confirmarRedefinirSenhaMaster = confirmarRedefinirSenhaMaster;

function toggleVerGeminiDossie() {
    const inp = document.getElementById('dossie-emp-gemini-key');
    const icone = document.getElementById('olho-gemini-dossie');
    if (!inp) return;
    if (inp.type === 'password') {
        inp.type = 'text';
        if (icone) { icone.classList.remove('fa-eye'); icone.classList.add('fa-eye-slash'); }
    } else {
        inp.type = 'password';
        if (icone) { icone.classList.remove('fa-eye-slash'); icone.classList.add('fa-eye'); }
    }
}
window.toggleVerGeminiDossie = toggleVerGeminiDossie;

function selecionarPlanoNoDossie(planoId) {
    const plano = listaPlanos.find(p => p.id === planoId) || PLANOS_PADRAO.find(p => p.id === planoId || p.id === 'plano_' + String(planoId).toLowerCase());
    if (plano) {
        const inputValor = document.getElementById('dossie-ass-valor');
        if (inputValor && plano.preco !== undefined) {
            inputValor.value = Number(plano.preco).toFixed(2);
        }

        const mods = plano.modulos || ['pdv', 'vendas', 'estoque'];
        const listaMods = ['pdv', 'vendas', 'fiscal', 'estoque', 'financeiro', 'caixa', 'compras', 'relatorios', 'agenda', 'site', 'ia', 'suporte'];
        listaMods.forEach(m => {
            const chk = document.getElementById(`dossie-mod-${m}`);
            if (chk) chk.checked = mods.includes(m);
        });

        // Marca relatorios padrão do plano selecionado
        const rels = Array.isArray(plano.relatoriosPermitidos) ? plano.relatoriosPermitidos : (PLANOS_PADRAO.find(p => p.id === plano.id)?.relatoriosPermitidos || TODOS_RELATORIOS_SAAS);
        TODOS_RELATORIOS_SAAS.forEach(r => {
            const chk = document.getElementById(`dossie-rel-${r}`);
            if (chk) chk.checked = rels.includes(r);
        });

        showToast(`Módulos e relatórios padrão do plano "${plano.nome}" aplicados!`, 'info');
    }
}
window.selecionarPlanoNoDossie = selecionarPlanoNoDossie;
function marcarTodosRelatoriosDossie(marcar) {
    TODOS_RELATORIOS_SAAS.forEach(r => {
        const chk = document.getElementById(`dossie-rel-${r}`);
        if (chk) chk.checked = Boolean(marcar);
    });
}
window.marcarTodosRelatoriosDossie = marcarTodosRelatoriosDossie;


async function abrirDossieEmpresa(empresaId) {
    const loja = listaLojas.find(l => l.id === empresaId);
    if (!loja) return;

    lojaDossieAtual = loja;

    // Cabeçalho do modal
    const elTitulo = document.getElementById('dossie-empresa-titulo');
    const elId = document.getElementById('dossie-empresa-id');
    const elBadge = document.getElementById('dossie-empresa-status-badge');
    const inputId = document.getElementById('dossie-input-empresa-id');

    if (elTitulo) elTitulo.innerText = loja.nomeEmpresa || loja.nome || 'Loja Sem Nome';
    if (elId) elId.innerText = `ID: ${loja.id}`;
    if (inputId) inputId.value = loja.id;

    const status = loja.status || 'ATIVO';
    if (elBadge) {
        elBadge.innerText = status;
        elBadge.className = status === 'BLOQUEADO'
            ? 'px-2.5 py-0.5 rounded-full text-xs font-black bg-red-500/15 text-red-400 border border-red-500/30'
            : 'px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
    }

    // Card de Credenciais de Acesso
    dossieSenhaVisivel = false;
    const credEmail = document.getElementById('dossie-cred-email');
    const credSenha = document.getElementById('dossie-cred-senha');
    const credOlho = document.getElementById('dossie-cred-olho');
    if (credEmail) credEmail.innerText = loja.emailAcesso || loja.donoInfo?.email || 'Sem login';
    if (credSenha) credSenha.innerText = '••••••••';
    if (credOlho) { credOlho.classList.add('fa-eye'); credOlho.classList.remove('fa-eye-slash'); }

    // Carrega dados fiscais e cadastrais
    const emp = loja.configEmpresa || {};
    document.getElementById('dossie-cad-razao').value = emp.nome || loja.nomeEmpresa || '';
    document.getElementById('dossie-cad-fantasia').value = emp.fantasia || loja.nomeEmpresa || '';
    document.getElementById('dossie-cad-cnpj').value = emp.cnpj || loja.cnpj || '';
    document.getElementById('dossie-cad-ie').value = emp.ie || '';
    document.getElementById('dossie-cad-crt').value = emp.crt || '1';
    document.getElementById('dossie-cad-cep').value = emp.cep || '';
    document.getElementById('dossie-cad-rua').value = emp.rua || '';
    document.getElementById('dossie-cad-numero').value = emp.numero || '';
    document.getElementById('dossie-cad-bairro').value = emp.bairro || '';
    document.getElementById('dossie-cad-cidade').value = emp.cidade || '';
    document.getElementById('dossie-cad-uf').value = emp.uf || 'GO';
    document.getElementById('dossie-cad-whatsapp').value = loja.whatsapp || emp.telefone || '';
    document.getElementById('dossie-cad-telefone').value = emp.telefone || '';

    // Carrega dados da assinatura
    popularSelectsSistemas();

    const elSistemaAss = document.getElementById('dossie-ass-sistema');
    const sisLoja = loja.sistemaId || 'fc_gestao';
    if (elSistemaAss) elSistemaAss.value = sisLoja;

    let planoId = loja.plano || 'plano_pro';
    popularSelectPlanosPorSistema('dossie-ass-plano', sisLoja, planoId);
    planoId = document.getElementById('dossie-ass-plano')?.value || planoId;
    document.getElementById('dossie-ass-valor').value = loja.valorMensalidade !== undefined ? loja.valorMensalidade : 99.00;
    document.getElementById('dossie-ass-vencimento').value = loja.dataVencimento || '';
    document.getElementById('dossie-ass-status').value = status;

    // Carrega Módulos Liberados de Verdade
    const planoObj = listaPlanos.find(p => p.id === planoId) || PLANOS_PADRAO.find(p => p.id === planoId || p.id === 'plano_' + String(planoId).toLowerCase()) || PLANOS_PADRAO[1];
    const modulosPadrao = planoObj?.modulos || ['pdv', 'vendas', 'fiscal', 'estoque'];
    const modulosAtivos = Array.isArray(loja.modulosLiberados) && loja.modulosLiberados.length > 0 ? loja.modulosLiberados : modulosPadrao;
    const listaMods = ['pdv', 'vendas', 'fiscal', 'estoque', 'financeiro', 'caixa', 'compras', 'relatorios', 'agenda', 'site', 'ia', 'suporte'];
    listaMods.forEach(m => {
        const chk = document.getElementById(`dossie-mod-${m}`);
        if (chk) chk.checked = modulosAtivos.includes(m);
    });

    // Carrega Relatórios Permitidos da Loja (ou padrão do plano se não configurado)
    const relsPadrao = planoObj?.relatoriosPermitidos || TODOS_RELATORIOS_SAAS;
    const relsAtivos = (Array.isArray(loja.relatoriosPermitidos) && loja.relatoriosPermitidos.length > 0) ? loja.relatoriosPermitidos : relsPadrao;
    TODOS_RELATORIOS_SAAS.forEach(r => {
        const chk = document.getElementById(`dossie-rel-${r}`);
        if (chk) chk.checked = relsAtivos.includes(r);
    });

    // Carrega Chave Gemini Individual da Loja
    const inpGemini = document.getElementById('dossie-emp-gemini-key');
    if (inpGemini) {
        inpGemini.value = loja.geminiKey || emp.geminiKey || '';
        inpGemini.type = 'password';
        const olhoG = document.getElementById('olho-gemini-dossie');
        if (olhoG) { olhoG.classList.add('fa-eye'); olhoG.classList.remove('fa-eye-slash'); }
    }

    // Configura Aba de Mensalidades & Pagamentos
    const elFatVal = document.getElementById('dossie-fatura-valor-display');
    const elFatPlano = document.getElementById('dossie-fatura-plano-display');
    const elFatVenc = document.getElementById('dossie-fatura-venc-display');
    const elFatBadge = document.getElementById('dossie-fatura-status-badge');

    const planoNome = (listaPlanos.find(p => p.id === planoId)?.nome) || planoId;
    if (elFatVal) elFatVal.innerText = Number(loja.valorMensalidade || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    if (elFatPlano) elFatPlano.innerText = `Plano: ${planoNome}`;
    if (elFatVenc) elFatVenc.innerText = formatarDataBr(loja.dataVencimento);
    if (elFatBadge) elFatBadge.innerText = status;

    const elRegVal = document.getElementById('fatura-reg-valor');
    const elRegMetodo = document.getElementById('fatura-reg-metodo');
    const elRegData = document.getElementById('fatura-reg-data');
    const elRegNovoVenc = document.getElementById('fatura-reg-novo-venc');
    const elRegObs = document.getElementById('fatura-reg-obs');

    if (elRegVal) elRegVal.value = Number(loja.valorMensalidade || 0).toFixed(2);
    if (elRegMetodo) elRegMetodo.value = 'PIX';
    const hojeStr = new Date().toISOString().split('T')[0];
    if (elRegData) elRegData.value = hojeStr;

    let baseVenc = loja.dataVencimento ? new Date(loja.dataVencimento + 'T00:00:00') : new Date();
    if (isNaN(baseVenc.getTime()) || baseVenc < new Date()) {
        baseVenc = new Date();
    }
    baseVenc.setDate(baseVenc.getDate() + 30);
    if (elRegNovoVenc) elRegNovoVenc.value = baseVenc.toISOString().split('T')[0];
    if (elRegObs) elRegObs.value = '';

    // Configura Aba de Anotações CRM Privado
    const elCrmNotas = document.getElementById('dossie-crm-notas');
    const elCrmMod = document.getElementById('dossie-crm-ultima-salva');
    if (elCrmNotas) elCrmNotas.value = loja.crmNotas || '';
    if (elCrmMod) elCrmMod.innerText = loja.crmUltimaModificacao ? 'Última modificação: ' + loja.crmUltimaModificacao : 'Nenhuma anotação registrada ainda';

    // Abre na primeira aba
    trocarAbaDossie('cadastral');

    // Carrega dados assíncronos
    await carregarUsuariosDossie(loja.id);
    await carregarFaturasDossie(loja.id);

    const modal = document.getElementById('modal-dossie-empresa');
    if (modal) modal.classList.remove('hidden');
}
window.abrirDossieEmpresa = abrirDossieEmpresa;

function fecharModalDossie() {
    const modal = document.getElementById('modal-dossie-empresa');
    if (modal) modal.classList.add('hidden');
    lojaDossieAtual = null;
}
window.fecharModalDossie = fecharModalDossie;

function trocarAbaDossie(aba) {
    const abas = ['cadastral', 'assinatura', 'usuarios', 'faturas', 'crm', 'contrato'];
    abas.forEach(a => {
        const div = document.getElementById(`dossie-aba-${a}`);
        const btn = document.getElementById(`tab-btn-${a}`);
        if (div) div.classList.add('hidden');
        if (btn) {
            btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all';
        }
    });

    const divAtiva = document.getElementById(`dossie-aba-${aba}`);
    const btnAtivo = document.getElementById(`tab-btn-${aba}`);
    if (divAtiva) divAtiva.classList.remove('hidden');
    if (btnAtivo) {
        btnAtivo.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-amber-500 text-slate-950 shadow-sm';
    }

    // Se clicar na aba de usuários, garante carregamento
    if (aba === 'usuarios' && lojaDossieAtual) {
        carregarUsuariosDossie(lojaDossieAtual.id);
    }
}
window.trocarAbaDossie = trocarAbaDossie;

// Salvar dados cadastrais e fiscais da empresa
async function salvarDadosCadastraisEmpresa(e) {
    if (e) e.preventDefault();
    if (!lojaDossieAtual) return;

    const id = lojaDossieAtual.id;
    const razao = document.getElementById('dossie-cad-razao').value.trim();
    const fantasia = document.getElementById('dossie-cad-fantasia').value.trim();
    const cnpj = document.getElementById('dossie-cad-cnpj').value.trim();
    const ie = document.getElementById('dossie-cad-ie').value.trim();
    const crt = document.getElementById('dossie-cad-crt').value;
    const cep = document.getElementById('dossie-cad-cep').value.trim();
    const rua = document.getElementById('dossie-cad-rua').value.trim();
    const numero = document.getElementById('dossie-cad-numero').value.trim();
    const bairro = document.getElementById('dossie-cad-bairro').value.trim();
    const cidade = document.getElementById('dossie-cad-cidade').value.trim();
    const uf = document.getElementById('dossie-cad-uf').value.trim();
    const wpp = document.getElementById('dossie-cad-whatsapp').value.trim();
    const tel = document.getElementById('dossie-cad-telefone').value.trim();

    try {
        const empDados = {
            razaoSocial: razao,
            nomeFantasia: fantasia,
            nome: razao,
            fantasia: fantasia,
            cnpj: cnpj,
            ie: ie,
            crt: crt,
            cep: cep,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            telefone: tel || wpp
        };

        const db = firebase.firestore();
        const batch = db.batch();

        // 1. Grava no documento da empresa
        batch.set(db.collection('empresas').doc(id), {
            nome: razao || fantasia,
            fantasia: fantasia || razao,
            cnpj: cnpj,
            telefone: tel || wpp,
            whatsapp: wpp || tel,
            cidade: cidade,
            uf: uf,
            configEmpresa: empDados,
            ultimaAtualizacaoMaster: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // 2. Grava nas configurações internas da empresa (espelho)
        batch.set(db.collection('empresas').doc(id).collection('configuracoes').doc('config'), {
            empresa: empDados
        }, { merge: true });

        await batch.commit();

        lojaDossieAtual.nome = razao || fantasia;
        lojaDossieAtual.fantasia = fantasia || razao;
        lojaDossieAtual.cidade = cidade;
        lojaDossieAtual.uf = uf;
        lojaDossieAtual.telefone = tel || wpp;
        lojaDossieAtual.whatsapp = wpp;
        lojaDossieAtual.cnpj = cnpj;
        lojaDossieAtual.configEmpresa = empDados;

        atualizarKPIsMaster();
        renderizarTabelaLojasMaster();
        showToast('Dados cadastrais da empresa salvos com sucesso!', 'success');

    } catch (err) {
        console.error("Erro ao salvar cadastro:", err);
        showToast('Erro ao salvar: ' + err.message, 'error');
    }
}
window.salvarDadosCadastraisEmpresa = salvarDadosCadastraisEmpresa;

// Salvar assinatura pelo dossiê
async function salvarAssinaturaPeloDossie(e) {
    if (e) e.preventDefault();
    if (!lojaDossieAtual) return;

    const id = lojaDossieAtual.id;
    const sistemaId = document.getElementById('dossie-ass-sistema')?.value || 'fc_gestao';
    const plano = document.getElementById('dossie-ass-plano').value;
    const valor = parseFloat(document.getElementById('dossie-ass-valor').value) || 0;
    const venc = document.getElementById('dossie-ass-vencimento').value;
    const status = document.getElementById('dossie-ass-status').value;

    const listaMods = ['pdv', 'vendas', 'fiscal', 'estoque', 'financeiro', 'caixa', 'compras', 'relatorios', 'agenda', 'site', 'ia', 'marketing', 'suporte'];
    const modulosLiberados = listaMods.filter(m => document.getElementById(`dossie-mod-${m}`)?.checked);
    const relatoriosPermitidos = TODOS_RELATORIOS_SAAS.filter(r => document.getElementById(`dossie-rel-${r}`)?.checked);
    const geminiKey = document.getElementById('dossie-emp-gemini-key')?.value.trim() || '';

    try {
        const db = firebase.firestore();
        const batch = db.batch();

        // 1. Atualiza no doc principal da empresa
        batch.set(db.collection('empresas').doc(id), {
            sistemaId: sistemaId,
            plano: plano,
            valorMensalidade: valor,
            dataVencimento: venc,
            status: status,
            modulosLiberados: modulosLiberados,
            relatoriosPermitidos: relatoriosPermitidos,
            geminiKey: geminiKey,
            ultimaAtualizacaoMaster: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // 2. Se for o sistema fc_gestao, espelha no doc de config
        if (sistemaId === 'fc_gestao') {
            batch.set(db.collection('empresas').doc(id).collection('configuracoes').doc('config'), {
                empresa: {
                    plano: plano,
                    geminiKey: geminiKey
                }
            }, { merge: true });
        }

        await batch.commit();

        // Atualiza na memória
        lojaDossieAtual.sistemaId = sistemaId;
        lojaDossieAtual.plano = plano;
        lojaDossieAtual.valorMensalidade = valor;
        lojaDossieAtual.dataVencimento = venc;
        lojaDossieAtual.status = status;
        lojaDossieAtual.modulosLiberados = modulosLiberados;
        lojaDossieAtual.relatoriosPermitidos = relatoriosPermitidos;
        lojaDossieAtual.geminiKey = geminiKey;
        if (!lojaDossieAtual.configEmpresa) lojaDossieAtual.configEmpresa = {};
        lojaDossieAtual.configEmpresa.geminiKey = geminiKey;

        const idx = listaLojas.findIndex(l => l.id === id);
        if (idx >= 0) {
            listaLojas[idx] = { ...listaLojas[idx], ...lojaDossieAtual };
        }

        const elBadge = document.getElementById('dossie-empresa-status-badge');
        if (elBadge) {
            elBadge.innerText = status;
            elBadge.className = status === 'BLOQUEADO'
                ? 'px-2.5 py-0.5 rounded-full text-xs font-black bg-red-500/15 text-red-400 border border-red-500/30'
                : 'px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
        }

        atualizarKPIsMaster();
        renderizarTabelaLojasMaster();
        popularSelectsSistemas();
        if (typeof renderizarRelatoriosSaaS === 'function') renderizarRelatoriosSaaS();
        showToast('Assinatura e permissões da loja salvas com sucesso!', 'success');

    } catch (err) {
        console.error("Erro ao salvar assinatura:", err);
        showToast('Erro: ' + err.message, 'error');
    }
}
window.salvarAssinaturaPeloDossie = salvarAssinaturaPeloDossie;

// Carregar faturas da loja no Dossiê
async function carregarFaturasDossie(empresaId) {
    const corpo = document.getElementById('dossie-lista-faturas-corpo');
    const badgeQtd = document.getElementById('dossie-total-faturas-count');
    if (!corpo) return;

    try {
        const snap = await firebase.firestore().collection('empresas').doc(empresaId)
            .collection('faturas_saas')
            .orderBy('dataPagamento', 'desc')
            .get();

        const faturas = snap.docs.map(d => ({ id: d.id, ...d.data() }));

        if (badgeQtd) {
            badgeQtd.innerText = `${faturas.length} pagamento(s) registrado(s)`;
        }

        if (faturas.length === 0) {
            corpo.innerHTML = `
                <tr>
                    <td colspan="6" class="py-8 text-center text-slate-500">
                        <i class="fa-solid fa-receipt text-2xl mb-1 text-slate-600"></i>
                        <p>Nenhum pagamento registrado ainda para esta loja.</p>
                        <p class="text-[10px] text-slate-600 mt-0.5">Use o formulário acima para registrar recebimentos via PIX ou dinheiro.</p>
                    </td>
                </tr>
            `;
            return;
        }

        corpo.innerHTML = faturas.map(fat => {
            const dataPgtoFmt = formatarDataBr(fat.dataPagamento);
            const vencFmt = formatarDataBr(fat.novoVencimento || fat.dataVencimento);
            const valorFmt = Number(fat.valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const metodo = fat.metodo || 'PIX';
            const obs = fat.obs || '-';

            return `
                <tr class="hover:bg-slate-800/40">
                    <td class="py-2.5 px-3 font-mono font-bold text-white">${dataPgtoFmt}</td>
                    <td class="py-2.5 px-3 font-black text-emerald-400 text-sm">${valorFmt}</td>
                    <td class="py-2.5 px-3">
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-200 border border-slate-700">${metodo}</span>
                    </td>
                    <td class="py-2.5 px-3 font-mono text-amber-300">${vencFmt}</td>
                    <td class="py-2.5 px-3 text-slate-400 max-w-[180px] truncate" title="${obs}">${obs}</td>
                    <td class="py-2.5 px-3 text-right">
                        <button type="button" onclick="copiarReciboFatura('${fat.id}')" title="Copiar Recibo WhatsApp" class="text-xs bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/30 font-bold transition-all inline-flex items-center gap-1">
                            <i class="fa-solid fa-copy text-[10px]"></i> Recibo
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

    } catch (err) {
        console.error("Erro ao carregar histórico de faturas:", err);
        corpo.innerHTML = `
            <tr>
                <td colspan="6" class="py-4 text-center text-red-400">
                    Erro ao carregar histórico: ${err.message}
                </td>
            </tr>
        `;
    }
}
window.carregarFaturasDossie = carregarFaturasDossie;

// Registrar pagamento de mensalidade com 1 clique e auto-renovação
async function registrarPagamentoMensalidadeDossie(e) {
    if (e) e.preventDefault();
    if (!lojaDossieAtual) return;

    const id = lojaDossieAtual.id;
    const valor = parseFloat(document.getElementById('fatura-reg-valor').value) || 0;
    const metodo = document.getElementById('fatura-reg-metodo').value;
    const dataPgto = document.getElementById('fatura-reg-data').value;
    const novoVenc = document.getElementById('fatura-reg-novo-venc').value;
    const obs = document.getElementById('fatura-reg-obs').value.trim();
    const btn = document.getElementById('btn-registrar-fatura');

    if (!valor || !dataPgto || !novoVenc) {
        showToast('Informe o valor, a data do pagamento e o novo vencimento!', 'error');
        return;
    }

    try {
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando...';
        }

        const db = firebase.firestore();
        const batch = db.batch();

        // 1. Registra na subcoleção de faturas
        const faturaRef = db.collection('empresas').doc(id).collection('faturas_saas').doc();
        batch.set(faturaRef, {
            valor: valor,
            metodo: metodo,
            dataPagamento: dataPgto,
            novoVencimento: novoVenc,
            obs: obs,
            criadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });

        // 2. Atualiza data de vencimento da empresa e status para ATIVO
        batch.set(db.collection('empresas').doc(id), {
            dataVencimento: novoVenc,
            status: 'ATIVO',
            ultimoPagamentoData: dataPgto,
            ultimoPagamentoValor: valor,
            ultimaAtualizacaoMaster: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        await batch.commit();

        // Atualiza memória
        lojaDossieAtual.dataVencimento = novoVenc;
        lojaDossieAtual.status = 'ATIVO';

        const idx = listaLojas.findIndex(l => l.id === id);
        if (idx >= 0) {
            listaLojas[idx].dataVencimento = novoVenc;
            listaLojas[idx].status = 'ATIVO';
        }

        // Atualiza elementos do dossiê
        document.getElementById('dossie-ass-vencimento').value = novoVenc;
        document.getElementById('dossie-ass-status').value = 'ATIVO';
        document.getElementById('dossie-fatura-venc-display').innerText = formatarDataBr(novoVenc);
        document.getElementById('dossie-fatura-status-badge').innerText = 'ATIVO (Renovado)';

        atualizarKPIsMaster();
        renderizarTabelaLojasMaster();
        if (typeof renderizarRelatoriosSaaS === 'function') renderizarRelatoriosSaaS();

        await carregarFaturasDossie(id);

        showToast(`Recebimento de ${valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} registrado! Vencimento estendido para ${formatarDataBr(novoVenc)}.`, 'success');

        // Sugere cópia de comprovante
        const reciboTxt = `*COMPROVANTE DE PAGAMENTO DE MENSALIDADE*\n\n` +
            `🏢 *Empresa:* ${lojaDossieAtual.nomeEmpresa || lojaDossieAtual.nome}\n` +
            `💰 *Valor Recebido:* ${valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n` +
            `💳 *Forma de Pgto:* ${metodo}\n` +
            `📅 *Data do Recebimento:* ${formatarDataBr(dataPgto)}\n` +
            `🗓️ *Próximo Vencimento:* ${formatarDataBr(novoVenc)}\n` +
            `🟢 *Status:* Acesso 100% Ativo e Liberado\n\n` +
            `Agradecemos pela parceria e confiança contínua no nosso sistema!`;

        copiarTexto(reciboTxt, 'Recibo copiado para envio no WhatsApp!');

    } catch (err) {
        console.error("Erro ao registrar fatura:", err);
        showToast('Erro ao registrar pagamento: ' + err.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-check-double"></i> Confirmar Pagamento & Renovar Loja';
        }
    }
}
window.registrarPagamentoMensalidadeDossie = registrarPagamentoMensalidadeDossie;

// Copiar recibo de fatura já gravada
async function copiarReciboFatura(faturaId) {
    if (!lojaDossieAtual) return;

    try {
        const doc = await firebase.firestore().collection('empresas').doc(lojaDossieAtual.id).collection('faturas_saas').doc(faturaId).get();
        if (!doc.exists) {
            showToast('Fatura não encontrada.', 'error');
            return;
        }

        const fat = doc.data();
        const valorFmt = Number(fat.valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const reciboTxt = `*COMPROVANTE DE MENSALIDADE - SISTEMA SAAS*\n\n` +
            `🏢 *Empresa:* ${lojaDossieAtual.nomeEmpresa || lojaDossieAtual.nome}\n` +
            `💰 *Valor:* ${valorFmt}\n` +
            `💳 *Forma de Pgto:* ${fat.metodo || 'PIX'}\n` +
            `📅 *Data do Recebimento:* ${formatarDataBr(fat.dataPagamento)}\n` +
            `🗓️ *Próximo Vencimento:* ${formatarDataBr(fat.novoVencimento || fat.dataVencimento)}\n` +
            `🟢 *Status:* Acesso Ativo e Liberado\n\n` +
            `Agradecemos pela parceria! Qualquer dúvida estamos à disposição.`;

        copiarTexto(reciboTxt, 'Recibo copiado! Pronto para colar no WhatsApp.');

    } catch (err) {
        showToast('Erro ao buscar fatura: ' + err.message, 'error');
    }
}
window.copiarReciboFatura = copiarReciboFatura;

// Salvar anotações privadas / CRM do Fundador
async function salvarAnotacoesCRMDossie(e) {
    if (e) e.preventDefault();
    if (!lojaDossieAtual) return;

    const id = lojaDossieAtual.id;
    const notas = document.getElementById('dossie-crm-notas').value;
    const btn = document.getElementById('btn-salvar-crm');

    try {
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gravando...';
        }

        const agoraStr = new Date().toLocaleString('pt-BR');
        await firebase.firestore().collection('empresas').doc(id).set({
            crmNotas: notas,
            crmUltimaModificacao: agoraStr,
            ultimaAtualizacaoMaster: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        lojaDossieAtual.crmNotas = notas;
        lojaDossieAtual.crmUltimaModificacao = agoraStr;

        const idx = listaLojas.findIndex(l => l.id === id);
        if (idx >= 0) {
            listaLojas[idx].crmNotas = notas;
            listaLojas[idx].crmUltimaModificacao = agoraStr;
        }

        const elMod = document.getElementById('dossie-crm-ultima-salva');
        if (elMod) elMod.innerText = 'Última modificação: ' + agoraStr;

        showToast('Anotações privadas do CRM salvas com sucesso!', 'success');

    } catch (err) {
        console.error("Erro ao salvar CRM:", err);
        showToast('Erro ao salvar notas: ' + err.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Anotações Privadas';
        }
    }
}
window.salvarAnotacoesCRMDossie = salvarAnotacoesCRMDossie;

// Carregar equipe/usuários da empresa (consulta banco central e banco da loja)
async function carregarUsuariosDossie(empresaId) {
    const corpo = document.getElementById('dossie-lista-usuarios-corpo');
    const badgeQtd = document.getElementById('dossie-qtd-usuarios');
    if (!corpo) return;

    corpo.innerHTML = `
        <tr>
            <td colspan="4" class="py-6 text-center text-slate-500">
                <i class="fa-solid fa-spinner fa-spin text-xl mb-1 text-amber-400"></i>
                <p>Carregando equipe da empresa...</p>
            </td>
        </tr>
    `;

    try {
        let usuariosMap = new Map();

        // 1. Consulta no banco central do SaaS (fcgestao-testes)
        try {
            const snap = await firebase.firestore().collection('empresas').doc(empresaId).collection('funcionarios').get();
            snap.docs.forEach(d => {
                usuariosMap.set(d.id, { id: d.id, ...d.data() });
            });
        } catch (e1) {
            console.warn("[Dossiê Equipe] Aviso ao consultar banco central:", e1.message);
        }

        // 2. Consulta no banco de produção da loja (lojafc-a31f9) com login administrativo automático
        if (window.LOJA_PRODUCAO_CONFIG) {
            try {
                let prodApp = firebase.apps.find(a => a.name === 'lojaProdMasterApp');
                if (!prodApp) {
                    prodApp = firebase.initializeApp(window.LOJA_PRODUCAO_CONFIG, 'lojaProdMasterApp');
                }

                if (!prodApp.auth().currentUser) {
                    try {
                        await prodApp.auth().signInWithEmailAndPassword('fabricadecoresgoiania@gmail.com', '123456');
                    } catch(authE1) {
                        try {
                            await prodApp.auth().signInWithEmailAndPassword('paulo@gmail.com', '123456');
                        } catch(authE2) {}
                    }
                }

                if (prodApp.auth().currentUser) {
                    const prodSnap = await prodApp.firestore().collection('empresas').doc(empresaId).collection('funcionarios').get();
                    prodSnap.docs.forEach(d => {
                        const data = d.data();
                        if (!usuariosMap.has(d.id)) {
                            usuariosMap.set(d.id, { id: d.id, ...data });
                            // Sincroniza para o banco central do SaaS para consultas futuras instantâneas
                            firebase.firestore().collection('empresas').doc(empresaId).collection('funcionarios').doc(d.id).set(data, { merge: true }).catch(() => {});
                        }
                    });
                }
            } catch (e2) {
                console.warn("[Dossiê Equipe] Aviso ao consultar banco de produção:", e2.message);
            }
        }

        const usuarios = Array.from(usuariosMap.values());

        if (badgeQtd) badgeQtd.innerText = usuarios.length;

        if (usuarios.length === 0) {
            corpo.innerHTML = `
                <tr>
                    <td colspan="5" class="py-6 text-center text-slate-500">
                        Nenhum colaborador adicional cadastrado nesta loja.
                    </td>
                </tr>
            `;
            return;
        }

        // Guarda lista em memória para edição rápida
        lojaDossieAtual._usuariosCache = usuarios;

        corpo.innerHTML = usuarios.map(u => {
            const isAdmin = u.isAdmin === true || u.isAdmin === 'true' || (u.cargo && String(u.cargo).toLowerCase().includes('admin')) || u.role === 'admin' || (u.nome && String(u.nome).toLowerCase().includes('administrador'));
            const isVendedor = u.vendedor === 'SIM' || u.isVendedor === true || (u.cargo && String(u.cargo).toLowerCase().includes('vendedor'));
            
            let badgePerfil = '';
            if (isAdmin) {
                badgePerfil = '<span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">Administrador</span>';
            } else if (isVendedor) {
                badgePerfil = '<span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">Vendedor</span>';
            } else {
                badgePerfil = `<span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">${u.cargo || 'Colaborador'}</span>`;
            }

            const status = (u.status === 'inativo' || u.status === 'INATIVO') ? '<span class="text-red-400 font-bold">● Inativo</span>' : '<span class="text-emerald-400 font-bold">● Ativo</span>';

            const comissaoTexto = (u.comissao !== undefined && u.comissao !== null && u.comissao !== '') 
                ? `<div class="text-[10px] text-amber-400 font-medium">Comissão: ${u.comissao}%</div>` 
                : '';

            return `
                <tr class="hover:bg-slate-800/40 transition-colors">
                    <td class="py-3 px-3">
                        <div class="font-extrabold text-white text-xs">${u.nome || 'Sem Nome'}</div>
                        ${comissaoTexto}
                    </td>
                    <td class="py-3 px-3 font-mono text-slate-300 text-xs">
                        <div class="flex items-center gap-1.5">
                            <span>${u.email || u.login || 'Sem login cadastrado'}</span>
                            ${(u.email || u.login) ? `
                                <button onclick="copiarTexto('${u.email || u.login}', 'Login copiado!')" title="Copiar e-mail" class="text-slate-500 hover:text-amber-400 transition-colors">
                                    <i class="fa-solid fa-copy text-[10px]"></i>
                                </button>
                            ` : ''}
                        </div>
                    </td>
                    <td class="py-3 px-3">
                        ${badgePerfil}
                    </td>
                    <td class="py-3 px-3 text-center text-xs">
                        ${status}
                    </td>
                    <td class="py-3 px-3 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                            <button type="button" onclick="event.stopPropagation(); abrirModalFuncionarioMaster('${u.id}')" title="Editar Colaborador" class="w-7 h-7 rounded-lg bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 flex items-center justify-center transition-all border border-amber-500/30 cursor-pointer">
                                <i class="fa-solid fa-pen text-[11px]"></i>
                            </button>
                            <button type="button" onclick="event.stopPropagation(); excluirFuncionarioPeloMaster('${u.id}', '${(u.nome || '').replace(/'/g, "\\'")}')" title="Excluir Colaborador" class="w-7 h-7 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 flex items-center justify-center transition-all border border-red-500/30 cursor-pointer">
                                <i class="fa-solid fa-trash text-[11px]"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

    } catch (err) {
        console.error("Erro ao carregar usuários:", err);
        corpo.innerHTML = `
            <tr>
                <td colspan="5" class="py-4 text-center text-red-400">
                    Não foi possível carregar a equipe: ${err.message}
                </td>
            </tr>
        `;
    }
}

function irParaContratosDaEmpresa() {
    if (!lojaDossieAtual) return;
    const id = lojaDossieAtual.id;
    fecharModalDossie();
    gerarContratoParaLoja(id);
}
window.irParaContratosDaEmpresa = irParaContratosDaEmpresa;

// -----------------------------------------------------------------------
// MODAL & CRUD DE COLABORADORES PELO SAAS MASTER
// -----------------------------------------------------------------------
function abrirModalFuncionarioMaster(funcId = null) {
    if (!lojaDossieAtual) {
        showToast('Nenhuma loja selecionada no dossiê.', 'error');
        return;
    }

    const modal = document.getElementById('modal-funcionario-master');
    const elTitulo = document.getElementById('modal-func-titulo');
    const elSub = document.getElementById('modal-func-subtitulo');
    const inputId = document.getElementById('func-master-id');
    const inputNome = document.getElementById('func-master-nome');
    const inputEmail = document.getElementById('func-master-email');
    const inputTel = document.getElementById('func-master-telefone');
    const selectCargo = document.getElementById('func-master-cargo');
    const inputComissao = document.getElementById('func-master-comissao');
    const selectStatus = document.getElementById('func-master-status');
    const inputSenha = document.getElementById('func-master-senha');
    const dicaSenha = document.getElementById('func-master-senha-dica');

    const checkDash = document.getElementById('func-perm-dashboard');
    const checkPdv = document.getElementById('func-perm-pdv');
    const checkCad = document.getElementById('func-perm-cadastros');
    const checkGest = document.getElementById('func-perm-gestao');
    const checkConf = document.getElementById('func-perm-config');

    if (funcId) {
        // MODO EDIÇÃO
        const strId = String(funcId);
        const u = (lojaDossieAtual._usuariosCache || []).find(item => String(item.id) === strId) || {};
        if (elTitulo) elTitulo.innerText = 'Editar Colaborador';
        if (elSub) elSub.innerText = `Loja: ${lojaDossieAtual.nomeEmpresa || lojaDossieAtual.nome}`;
        if (inputId) inputId.value = strId;
        if (inputNome) inputNome.value = u.nome || '';
        if (inputEmail) inputEmail.value = u.email || u.login || '';
        if (inputTel) inputTel.value = u.telefone || '';
        if (inputComissao) inputComissao.value = u.comissao !== undefined ? u.comissao : 0;
        if (selectStatus) selectStatus.value = (u.status === 'inativo' || u.status === 'INATIVO') ? 'INATIVO' : 'ATIVO';
        if (inputSenha) {
            inputSenha.value = '';
            inputSenha.required = false;
        }
        if (dicaSenha) dicaSenha.innerText = 'Deixe em branco para manter a senha atual do colaborador.';

        const isAdmin = u.isAdmin === true || u.isAdmin === 'true' || (u.cargo && String(u.cargo).toLowerCase().includes('admin'));
        const isVendedor = u.vendedor === 'SIM' || u.isVendedor === true || (u.cargo && String(u.cargo).toLowerCase().includes('vendedor'));
        if (selectCargo) {
            selectCargo.value = isAdmin ? 'admin' : (isVendedor ? 'vendedor' : 'operador');
        }

        const setMasterCheck = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.checked = !!val;
        };

        const temDash = u.perm_dashboard !== false;
        const temPdv = u.perm_pdv !== false;
        const temCadastros = u.perm_cadastros !== false;
        const temProd = u.perm_produtos !== undefined ? !!u.perm_produtos : temCadastros;
        const temCli = u.perm_clientes !== undefined ? !!u.perm_clientes : temCadastros;
        const temForn = u.perm_fornecedores !== undefined ? !!u.perm_fornecedores : temCadastros;

        const temVendasOp = u.perm_vendas_op !== undefined ? !!u.perm_vendas_op : temPdv;
        const temOrcamentos = u.perm_orcamentos !== undefined ? !!u.perm_orcamentos : temPdv;
        const temFiscal = u.perm_fiscal !== undefined ? !!u.perm_fiscal : !!u.perm_gestao;

        const temGestao = !!u.perm_gestao;
        const temFinanceiro = u.perm_financeiro !== undefined ? !!u.perm_financeiro : temGestao;
        const temCaixa = u.perm_caixa !== undefined ? !!u.perm_caixa : (temPdv || temGestao);
        const temCompras = u.perm_compras !== undefined ? !!u.perm_compras : temGestao;
        const temRelatorios = u.perm_relatorios !== undefined ? !!u.perm_relatorios : temGestao;
        const temAgenda = u.perm_agenda !== undefined ? !!u.perm_agenda : temGestao;
        const temMarketing = u.perm_marketing !== undefined ? !!u.perm_marketing : temGestao;
        const temConfig = u.perm_config === true || isAdmin;

        setMasterCheck('func-perm-dashboard', temDash);
        setMasterCheck('func-perm-pdv', temPdv);
        setMasterCheck('func-perm-vendas-op', temVendasOp);
        setMasterCheck('func-perm-orcamentos', temOrcamentos);
        setMasterCheck('func-perm-fiscal', temFiscal);
        setMasterCheck('func-perm-produtos', temProd);
        setMasterCheck('func-perm-clientes', temCli);
        setMasterCheck('func-perm-fornecedores', temForn);
        setMasterCheck('func-perm-financeiro', temFinanceiro);
        setMasterCheck('func-perm-caixa', temCaixa);
        setMasterCheck('func-perm-compras', temCompras);
        setMasterCheck('func-perm-relatorios', temRelatorios);
        setMasterCheck('func-perm-agenda', temAgenda);
        setMasterCheck('func-perm-marketing', temMarketing);
        setMasterCheck('func-perm-config', temConfig);

    } else {
        // NOVO COLABORADOR
        if (elTitulo) elTitulo.innerText = 'Novo Colaborador';
        if (elSub) elSub.innerText = `Adicionar à loja: ${lojaDossieAtual.nomeEmpresa || lojaDossieAtual.nome}`;
        if (inputId) inputId.value = '';
        if (inputNome) inputNome.value = '';
        if (inputEmail) inputEmail.value = '';
        if (inputTel) inputTel.value = '';
        if (selectCargo) selectCargo.value = 'vendedor';
        if (inputComissao) inputComissao.value = '0';
        if (selectStatus) selectStatus.value = 'ATIVO';
        if (inputSenha) {
            inputSenha.value = '123456';
            inputSenha.required = true;
        }
        if (dicaSenha) dicaSenha.innerText = 'Defina uma senha inicial com pelo menos 6 caracteres.';

        const setMasterCheck = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.checked = !!val;
        };

        setMasterCheck('func-perm-dashboard', true);
        setMasterCheck('func-perm-pdv', true);
        setMasterCheck('func-perm-vendas-op', true);
        setMasterCheck('func-perm-orcamentos', true);
        setMasterCheck('func-perm-fiscal', false);
        setMasterCheck('func-perm-produtos', true);
        setMasterCheck('func-perm-clientes', true);
        setMasterCheck('func-perm-fornecedores', false);
        setMasterCheck('func-perm-financeiro', false);
        setMasterCheck('func-perm-caixa', false);
        setMasterCheck('func-perm-compras', false);
        setMasterCheck('func-perm-relatorios', false);
        setMasterCheck('func-perm-agenda', false);
        setMasterCheck('func-perm-marketing', false);
        setMasterCheck('func-perm-config', false);
    }

    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
}
window.abrirModalFuncionarioMaster = abrirModalFuncionarioMaster;

function marcarTodasPermissoesMaster(estado) {
    const ids = [
        'func-perm-dashboard',
        'func-perm-pdv',
        'func-perm-vendas-op',
        'func-perm-orcamentos',
        'func-perm-fiscal',
        'func-perm-produtos',
        'func-perm-clientes',
        'func-perm-fornecedores',
        'func-perm-financeiro',
        'func-perm-caixa',
        'func-perm-compras',
        'func-perm-relatorios',
        'func-perm-agenda',
        'func-perm-marketing',
        'func-perm-config'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.checked = !!estado;
    });
}
window.marcarTodasPermissoesMaster = marcarTodasPermissoesMaster;

function fecharModalFuncionarioMaster() {
    const modal = document.getElementById('modal-funcionario-master');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}
window.fecharModalFuncionarioMaster = fecharModalFuncionarioMaster;

function atualizarPerfilFuncionarioMaster(cargo) {
    const setMasterCheck = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.checked = !!val;
    };

    if (cargo === 'admin') {
        marcarTodasPermissoesMaster(true);
    } else if (cargo === 'vendedor') {
        setMasterCheck('func-perm-dashboard', true);
        setMasterCheck('func-perm-pdv', true);
        setMasterCheck('func-perm-vendas-op', true);
        setMasterCheck('func-perm-orcamentos', true);
        setMasterCheck('func-perm-fiscal', false);
        setMasterCheck('func-perm-produtos', true);
        setMasterCheck('func-perm-clientes', true);
        setMasterCheck('func-perm-fornecedores', false);
        setMasterCheck('func-perm-financeiro', false);
        setMasterCheck('func-perm-caixa', false);
        setMasterCheck('func-perm-compras', false);
        setMasterCheck('func-perm-relatorios', false);
        setMasterCheck('func-perm-agenda', false);
        setMasterCheck('func-perm-marketing', false);
        setMasterCheck('func-perm-config', false);
    } else {
        // Operador
        setMasterCheck('func-perm-dashboard', false);
        setMasterCheck('func-perm-pdv', true);
        setMasterCheck('func-perm-vendas-op', true);
        setMasterCheck('func-perm-orcamentos', false);
        setMasterCheck('func-perm-fiscal', false);
        setMasterCheck('func-perm-produtos', false);
        setMasterCheck('func-perm-clientes', true);
        setMasterCheck('func-perm-fornecedores', false);
        setMasterCheck('func-perm-financeiro', false);
        setMasterCheck('func-perm-caixa', false);
        setMasterCheck('func-perm-compras', false);
        setMasterCheck('func-perm-relatorios', false);
        setMasterCheck('func-perm-agenda', false);
        setMasterCheck('func-perm-marketing', false);
        setMasterCheck('func-perm-config', false);
    }
}
window.atualizarPerfilFuncionarioMaster = atualizarPerfilFuncionarioMaster;

async function salvarFuncionarioPeloMaster(e) {
    if (e) e.preventDefault();
    if (!lojaDossieAtual) return;

    const empresaId = lojaDossieAtual.id;
    const funcId = document.getElementById('func-master-id').value.trim();
    const nome = document.getElementById('func-master-nome').value.trim();
    const email = document.getElementById('func-master-email').value.trim().toLowerCase();
    const telefone = document.getElementById('func-master-telefone').value.trim();
    const cargo = document.getElementById('func-master-cargo').value;
    const comissao = parseFloat(document.getElementById('func-master-comissao').value) || 0;
    const status = document.getElementById('func-master-status').value;
    const senha = document.getElementById('func-master-senha').value;
    const btn = document.getElementById('btn-salvar-func-master');

    if (!nome || !email) {
        showToast('Preencha o nome e o e-mail do colaborador!', 'error');
        return;
    }

    const isAdmin = cargo === 'admin';
    const isVendedor = cargo === 'vendedor';

    const getMasterCheck = (id) => {
        const el = document.getElementById(id);
        return el ? !!el.checked : false;
    };

    const perm_dashboard = getMasterCheck('func-perm-dashboard') || isAdmin;
    const perm_pdv = getMasterCheck('func-perm-pdv') || isAdmin;
    const perm_vendas_op = getMasterCheck('func-perm-vendas-op') || isAdmin;
    const perm_orcamentos = getMasterCheck('func-perm-orcamentos') || isAdmin;
    const perm_fiscal = getMasterCheck('func-perm-fiscal') || isAdmin;
    const perm_produtos = getMasterCheck('func-perm-produtos') || isAdmin;
    const perm_clientes = getMasterCheck('func-perm-clientes') || isAdmin;
    const perm_fornecedores = getMasterCheck('func-perm-fornecedores') || isAdmin;
    const perm_financeiro = getMasterCheck('func-perm-financeiro') || isAdmin;
    const perm_caixa = getMasterCheck('func-perm-caixa') || isAdmin;
    const perm_compras = getMasterCheck('func-perm-compras') || isAdmin;
    const perm_relatorios = getMasterCheck('func-perm-relatorios') || isAdmin;
    const perm_agenda = getMasterCheck('func-perm-agenda') || isAdmin;
    const perm_marketing = getMasterCheck('func-perm-marketing') || isAdmin;
    const perm_config = getMasterCheck('func-perm-config') || isAdmin;

    const perm_cadastros = perm_produtos || perm_clientes || perm_fornecedores;
    const perm_gestao = perm_financeiro || perm_caixa || perm_compras || perm_relatorios || perm_agenda || perm_marketing || perm_fiscal;

    const dadosFunc = {
        nome: nome,
        email: email,
        telefone: telefone,
        cargo: cargo,
        vendedor: isVendedor ? 'SIM' : 'NAO',
        isVendedor: isVendedor,
        isAdmin: isAdmin,
        comissao: comissao,
        status: status,
        perm_dashboard: perm_dashboard,
        perm_pdv: perm_pdv,
        perm_vendas_op: perm_vendas_op,
        perm_orcamentos: perm_orcamentos,
        perm_fiscal: perm_fiscal,
        perm_produtos: perm_produtos,
        perm_clientes: perm_clientes,
        perm_fornecedores: perm_fornecedores,
        perm_financeiro: perm_financeiro,
        perm_caixa: perm_caixa,
        perm_compras: perm_compras,
        perm_relatorios: perm_relatorios,
        perm_agenda: perm_agenda,
        perm_marketing: perm_marketing,
        perm_config: perm_config,
        perm_cadastros: perm_cadastros,
        perm_gestao: perm_gestao,
        ultimaAtualizacao: new Date().toISOString()
    };

    try {
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';
        }

        let idFinal = funcId;

        // Se for NOVO colaborador e senha foi informada, tenta criar conta no Firebase Auth da loja se possível
        if (!idFinal) {
            if (!senha || senha.length < 6) {
                showToast('Informe uma senha com no mínimo 6 caracteres para o novo colaborador!', 'error');
                if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Colaborador'; }
                return;
            }

            // Tenta criar usuário no Auth de produção via app secundário
            if (window.LOJA_PRODUCAO_CONFIG) {
                try {
                    let secApp;
                    try {
                        secApp = firebase.app('SecLojaMaster');
                    } catch(e) {
                        secApp = firebase.initializeApp(window.LOJA_PRODUCAO_CONFIG, 'SecLojaMaster');
                    }
                    const userCred = await secApp.auth().createUserWithEmailAndPassword(email, senha);
                    idFinal = userCred.user.uid;
                    await secApp.auth().signOut();
                } catch(authErr) {
                    console.warn("[SaaS Master] Aviso ao criar Auth:", authErr.message);
                }
            }

            if (!idFinal) {
                // Fallback: gera ID aleatório no Firestore se Auth já existir ou falhar
                idFinal = firebase.firestore().collection('empresas').doc(empresaId).collection('funcionarios').doc().id;
            }

            dadosFunc.id = idFinal;
            dadosFunc.dataCadastro = new Date().toISOString();
        } else {
            dadosFunc.id = idFinal;
        }

        // 1. Grava no banco central do SaaS (fcgestao-testes)
        await firebase.firestore().collection('empresas').doc(empresaId).collection('funcionarios').doc(idFinal).set(dadosFunc, { merge: true });

        // 2. Grava no banco de produção da loja (lojafc-a31f9)
        if (window.LOJA_PRODUCAO_CONFIG) {
            try {
                let prodApp = firebase.apps.find(a => a.name === 'lojaProdMasterApp');
                if (!prodApp) {
                    prodApp = firebase.initializeApp(window.LOJA_PRODUCAO_CONFIG, 'lojaProdMasterApp');
                }
                if (!prodApp.auth().currentUser) {
                    try {
                        await prodApp.auth().signInWithEmailAndPassword('fabricadecoresgoiania@gmail.com', '123456');
                    } catch(e) {}
                }
                if (prodApp.auth().currentUser) {
                    await prodApp.firestore().collection('empresas').doc(empresaId).collection('funcionarios').doc(idFinal).set(dadosFunc, { merge: true });
                    // Mapeamento global de login na loja
                    await prodApp.firestore().collection('usuarios').doc(idFinal).set({
                        email: email,
                        empresaId: empresaId,
                        role: isAdmin ? 'admin' : 'operador',
                        nome: nome,
                        ultimaAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
                    }, { merge: true });
                }
            } catch(eProd) {
                console.warn("[SaaS Master] Aviso ao sincronizar produção:", eProd.message);
            }
        }

        fecharModalFuncionarioMaster();
        await carregarUsuariosDossie(empresaId);
        showToast(`Colaborador ${nome} salvo e sincronizado com sucesso!`, 'success');

    } catch (err) {
        console.error("Erro ao salvar colaborador pelo SaaS Master:", err);
        showToast('Erro ao salvar colaborador: ' + err.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Colaborador';
        }
    }
}
window.salvarFuncionarioPeloMaster = salvarFuncionarioPeloMaster;

async function excluirFuncionarioPeloMaster(funcId, nome) {
    if (!lojaDossieAtual) return;
    const empresaId = lojaDossieAtual.id;

    if (!confirm(`Deseja realmente remover o colaborador "${nome || 'este colaborador'}" desta loja?\n\nO acesso ao sistema será revogado imediatamente.`)) {
        return;
    }

    try {
        // 1. Remove do SaaS Master
        await firebase.firestore().collection('empresas').doc(empresaId).collection('funcionarios').doc(funcId).delete();

        // 2. Remove do banco de produção da loja
        if (window.LOJA_PRODUCAO_CONFIG) {
            try {
                let prodApp = firebase.apps.find(a => a.name === 'lojaProdMasterApp');
                if (prodApp && prodApp.auth().currentUser) {
                    await prodApp.firestore().collection('empresas').doc(empresaId).collection('funcionarios').doc(funcId).delete();
                }
            } catch(e) {}
        }

        await carregarUsuariosDossie(empresaId);
        showToast(`Colaborador ${nome || ''} removido com sucesso!`, 'success');

    } catch (err) {
        console.error("Erro ao excluir colaborador:", err);
        showToast('Erro ao excluir: ' + err.message, 'error');
    }
}
window.excluirFuncionarioPeloMaster = excluirFuncionarioPeloMaster;

// ==========================================
// MÓDULO 3: GESTÃO DE PLANOS DO SAAS
// ==========================================
// Planos padrão e catálogo declarados no topo do arquivo.

async function carregarPlanosMaster() {
    try {
        const snap = await firebase.firestore().collection('planos_saas').get();
        if (snap.empty) {
            // Inicializa planos padrão no banco
            const batch = firebase.firestore().batch();
            PLANOS_PADRAO.forEach(p => {
                const ref = firebase.firestore().collection('planos_saas').doc(p.id);
                batch.set(ref, p);
            });
            await batch.commit();
            listaPlanos = [...PLANOS_PADRAO];
        } else {
            listaPlanos = snap.docs.map(d => ({ id: d.id, ...d.data(), sistemaId: d.data().sistemaId || 'fc_gestao' }));
            // Garante que os novos planos padrão estejam disponíveis caso a collection contenha apenas os antigos
            PLANOS_PADRAO.forEach(p => {
                if (!listaPlanos.some(x => x.id === p.id)) {
                    listaPlanos.push(p);
                    firebase.firestore().collection('planos_saas').doc(p.id).set(p).catch(() => {});
                }
            });
        }

        // Ordena sempre do mais caro para o mais barato (decrescente de valor)
        listaPlanos.sort((a, b) => Number(b.preco || 0) - Number(a.preco || 0));

        popularFiltroSistemasPlanos();
        renderizarGridPlanosMaster();
        atualizarSelectsDePlanos();

    } catch (err) {
        console.error("Erro ao carregar planos:", err);
        listaPlanos = [...PLANOS_PADRAO];
        listaPlanos.sort((a, b) => Number(b.preco || 0) - Number(a.preco || 0));
        popularFiltroSistemasPlanos();
        renderizarGridPlanosMaster();
        atualizarSelectsDePlanos();
    }
}
window.carregarPlanosMaster = carregarPlanosMaster;

function popularFiltroSistemasPlanos() {
    const sel = document.getElementById('filtro-plano-sistema');
    const badge = document.getElementById('badge-contagem-planos-sistema');
    if (!sel) return;

    const valAtual = sel.value || filtroPlanoSistemaAtual || 'todos';

    let html = `<option value="todos">Todos os Sistemas (${listaPlanos.length} planos)</option>`;
    listaSistemas.forEach(sis => {
        const count = listaPlanos.filter(p => (p.sistemaId || 'fc_gestao') === sis.id).length;
        html += `<option value="${sis.id}">${sis.nome} (${count} ${count === 1 ? 'plano' : 'planos'})</option>`;
    });

    sel.innerHTML = html;
    if (listaSistemas.some(s => s.id === valAtual) || valAtual === 'todos') {
        sel.value = valAtual;
        filtroPlanoSistemaAtual = valAtual;
    } else {
        sel.value = 'todos';
        filtroPlanoSistemaAtual = 'todos';
    }

    if (badge) {
        if (filtroPlanoSistemaAtual === 'todos') {
            badge.innerHTML = `<span class="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">Total: ${listaPlanos.length} planos</span>`;
        } else {
            const sis = listaSistemas.find(s => s.id === filtroPlanoSistemaAtual);
            const count = listaPlanos.filter(p => (p.sistemaId || 'fc_gestao') === filtroPlanoSistemaAtual).length;
            badge.innerHTML = `<span class="bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/20">${sis ? sis.nome : filtroPlanoSistemaAtual}: ${count} planos</span>`;
        }
    }
}
window.popularFiltroSistemasPlanos = popularFiltroSistemasPlanos;

function filtrarPlanosPorSistema(sistemaId) {
    filtroPlanoSistemaAtual = sistemaId || 'todos';
    const sel = document.getElementById('filtro-plano-sistema');
    if (sel && sel.value !== filtroPlanoSistemaAtual) {
        sel.value = filtroPlanoSistemaAtual;
    }
    popularFiltroSistemasPlanos();
    renderizarGridPlanosMaster();
}
window.filtrarPlanosPorSistema = filtrarPlanosPorSistema;

function navegarParaPlanosDoSistema(sistemaId) {
    navegarMaster('planos');
    filtrarPlanosPorSistema(sistemaId);
}
window.navegarParaPlanosDoSistema = navegarParaPlanosDoSistema;

function abrirModalPlanoComSistema(sistemaId) {
    filtroPlanoSistemaAtual = sistemaId || 'todos';
    abrirModalPlano();
}
window.abrirModalPlanoComSistema = abrirModalPlanoComSistema;

function renderizarGridPlanosMaster() {
    const grid = document.getElementById('grid-planos');
    if (!grid) return;

    const planosFiltrados = filtroPlanoSistemaAtual === 'todos' 
        ? listaPlanos 
        : listaPlanos.filter(p => (p.sistemaId || 'fc_gestao') === filtroPlanoSistemaAtual);

    if (planosFiltrados.length === 0) {
        grid.innerHTML = `
            <div class="col-span-3 text-center py-16 text-slate-500">
                <i class="fa-solid fa-layer-group text-4xl mb-3"></i>
                <p>Nenhum plano cadastrado. Clique no botão "+ Novo Plano" para criar.</p>
            </div>
        `;
        return;
    }

    const nomesModulos = {
        pdv: 'Frente de Caixa (PDV)',
        vendas: 'Vendas & Orçamentos',
        fiscal: 'Emissor NF-e / NFC-e',
        estoque: 'Controle de Estoque & Kardex',
        financeiro: 'Financeiro & Fluxo de Caixa',
        caixa: 'Caixa Físico',
        compras: 'Compras & XML',
        relatorios: 'Relatórios & DRE',
        agenda: 'Agenda & Tarefas',
        site: 'Loja / Catálogo Online',
        marketing: 'Marketing & Disparos',
        ia: 'Relatórios IA Gemini',
        suporte: 'Suporte WhatsApp VIP'
    };

    const corSistemaBadge = {
        amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
        emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
        purple: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
        blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
        rose: 'bg-rose-500/10 text-rose-400 border-rose-500/25',
        cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25'
    };

    grid.innerHTML = planosFiltrados.map(plano => {
        const sisId = plano.sistemaId || 'fc_gestao';
        const sis = listaSistemas.find(s => s.id === sisId);
        const nomeSistema = sis ? sis.nome : (sisId === 'fc_gestao' ? 'FC-Gestão' : sisId);
        const iconeSistema = sis?.icone || 'fa-cubes';
        const estiloBadge = corSistemaBadge[sis?.cor || 'amber'] || corSistemaBadge.amber;
        const valorFmt = Number(plano.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const mods = plano.modulos || [];

        return `
            <div class="bg-[#0f172a] rounded-3xl p-6 border ${plano.destaque ? 'border-amber-500/50 shadow-amber-500/10' : 'border-slate-800'} shadow-2xl flex flex-col justify-between relative overflow-hidden">
                ${plano.destaque ? `
                    <div class="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow-lg">
                        Mais Popular
                    </div>
                ` : ''}

                <div>
                    <div class="flex items-center justify-between gap-2 mb-2">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${estiloBadge}" title="Sistema vinculado: ${nomeSistema}">
                            <i class="fa-solid ${iconeSistema}"></i> ${nomeSistema}
                        </span>
                        ${plano.ativo !== false ? '<span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Ativo</span>' : '<span class="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">Inativo</span>'}
                    </div>
                    <div class="mb-2">
                        <h4 class="text-xl font-extrabold text-white">${plano.nome}</h4>
                    </div>

                    <p class="text-xs text-slate-400 mb-5 min-h-[32px]">${plano.descricao || ''}</p>

                    <div class="mb-6 flex items-baseline gap-1.5">
                        <span class="text-4xl font-black text-white">${valorFmt}</span>
                        <span class="text-xs font-semibold text-slate-400">/${plano.ciclo || 'mês'}</span>
                    </div>

                    <div class="space-y-2 py-4 border-y border-slate-800 text-xs">
                        <div class="flex items-center gap-2 font-bold text-slate-200">
                            <i class="fa-solid fa-users text-blue-400 w-4 text-center"></i> ${plano.usuarios || 'Usuários Ilimitados'}
                        </div>
                        <div class="flex items-center gap-2 font-bold text-slate-200">
                            <i class="fa-solid fa-boxes-stacked text-purple-400 w-4 text-center"></i> ${plano.produtos || 'Produtos Ilimitados'}
                        </div>
                    </div>

                    <div class="py-4 space-y-2">
                        <p class="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Módulos Inclusos:</p>
                        <ul class="space-y-1.5 text-xs text-slate-300">
                            ${Object.keys(nomesModulos).map(modKey => {
                                const tem = mods.includes(modKey);
                                return `
                                    <li class="flex items-center gap-2 ${tem ? 'text-slate-200' : 'text-slate-600 line-through'}">
                                        <i class="fa-solid ${tem ? 'fa-check text-emerald-400' : 'fa-xmark text-slate-600'} text-xs w-4 text-center"></i>
                                        ${nomesModulos[modKey]}
                                    </li>
                                `;
                            }).join('')}
                        </ul>
                    </div>

                    <div class="pt-3 border-t border-slate-800 space-y-2">
                        <div class="flex items-center justify-between">
                            <p class="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Relatórios Disponíveis:</p>
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${(plano.relatoriosPermitidos || TODOS_RELATORIOS_SAAS).length === TODOS_RELATORIOS_SAAS.length ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'}">${(plano.relatoriosPermitidos || TODOS_RELATORIOS_SAAS).length} de ${TODOS_RELATORIOS_SAAS.length}</span>
                        </div>
                        <p class="text-[11px] text-slate-400 leading-snug">
                            ${(plano.relatoriosPermitidos || TODOS_RELATORIOS_SAAS).length === TODOS_RELATORIOS_SAAS.length 
                                ? '<span class="text-emerald-400 font-semibold flex items-center gap-1"><i class="fa-solid fa-check-double text-xs"></i>Todos os 16 relatórios inclusos</span>' 
                                : `<span class="text-slate-300 font-medium">${(plano.relatoriosPermitidos || TODOS_RELATORIOS_SAAS).length} relatórios gerenciais inclusos</span>`}
                        </p>
                    </div>
                </div>

                <div class="pt-5 border-t border-slate-800 flex items-center justify-between gap-3">
                    <button onclick="editarPlanoMaster('${plano.id}')" class="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-pen-to-square"></i> Editar
                    </button>
                    <button onclick="excluirPlanoMaster('${plano.id}')" class="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/20 flex items-center justify-center transition-all">
                        <i class="fa-solid fa-trash-can text-sm"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function popularSelectPlanosPorSistema(selectId, sistemaId, valPreSelecionado = null) {
    const sel = document.getElementById(selectId);
    if (!sel) return;

    const sis = sistemaId || 'fc_gestao';
    const planosDoSistema = listaPlanos.filter(p => (p.sistemaId || 'fc_gestao') === sis);

    if (planosDoSistema.length === 0) {
        sel.innerHTML = '<option value="">(Nenhum plano cadastrado para este sistema)</option>';
        return;
    }

    sel.innerHTML = planosDoSistema.map(p => {
        const preco = Number(p.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return `<option value="${p.id}">${p.nome} (${preco})</option>`;
    }).join('');

    if (valPreSelecionado && planosDoSistema.some(p => p.id === valPreSelecionado)) {
        sel.value = valPreSelecionado;
    } else {
        sel.value = planosDoSistema[0].id;
    }
}
window.popularSelectPlanosPorSistema = popularSelectPlanosPorSistema;

function aoMudarSistemaNovaLoja(sistemaId) {
    popularSelectPlanosPorSistema('nova-loja-plano', sistemaId);
    const selPlano = document.getElementById('nova-loja-plano');
    if (selPlano && selPlano.value) {
        atualizarValorPorPlanoSelecionado(selPlano.value, 'nova-loja-valor');
    }
}
window.aoMudarSistemaNovaLoja = aoMudarSistemaNovaLoja;

function aoMudarSistemaNoDossie(sistemaId) {
    popularSelectPlanosPorSistema('dossie-ass-plano', sistemaId);
    const selPlano = document.getElementById('dossie-ass-plano');
    if (selPlano && selPlano.value) {
        selecionarPlanoNoDossie(selPlano.value);
    }
}
window.aoMudarSistemaNoDossie = aoMudarSistemaNoDossie;

function atualizarSelectsDePlanos() {
    const sisNovaLoja = document.getElementById('nova-loja-sistema')?.value || 'fc_gestao';
    const planoAtualNovaLoja = document.getElementById('nova-loja-plano')?.value;
    popularSelectPlanosPorSistema('nova-loja-plano', sisNovaLoja, planoAtualNovaLoja);

    const sisDossie = document.getElementById('dossie-ass-sistema')?.value || lojaDossieAtual?.sistemaId || 'fc_gestao';
    const planoAtualDossie = document.getElementById('dossie-ass-plano')?.value || lojaDossieAtual?.plano;
    popularSelectPlanosPorSistema('dossie-ass-plano', sisDossie, planoAtualDossie);
}
window.atualizarSelectsDePlanos = atualizarSelectsDePlanos;

function atualizarValorPorPlanoSelecionado(planoId, targetInputId) {
    const input = document.getElementById(targetInputId);
    if (!input) return;

    const p = listaPlanos.find(x => x.id === planoId);
    if (p && p.preco !== undefined) {
        input.value = Number(p.preco).toFixed(2);
    }
}
window.atualizarValorPorPlanoSelecionado = atualizarValorPorPlanoSelecionado;

function abrirModalPlano(plano = null) {
    const modal = document.getElementById('modal-plano');
    const titulo = document.getElementById('modal-plano-titulo');
    if (!modal) return;

    const selSistema = document.getElementById('plano-form-sistema');
    if (selSistema) {
        selSistema.innerHTML = listaSistemas.map(s => `
            <option value="${s.id}">${s.nome} (${s.ramo})</option>
        `).join('');

        if (plano && plano.sistemaId) {
            selSistema.value = plano.sistemaId;
        } else if (filtroPlanoSistemaAtual && filtroPlanoSistemaAtual !== 'todos') {
            selSistema.value = filtroPlanoSistemaAtual;
        } else {
            selSistema.value = 'fc_gestao';
        }
    }

    document.getElementById('plano-form-id').value = plano ? plano.id : '';
    document.getElementById('plano-form-nome').value = plano ? plano.nome : '';
    document.getElementById('plano-form-preco').value = plano ? plano.preco : '';
    document.getElementById('plano-form-ciclo').value = plano ? (plano.ciclo || 'mensal') : 'mensal';
    document.getElementById('plano-form-usuarios').value = plano ? (plano.usuarios || '') : '5 Usuários';
    document.getElementById('plano-form-produtos').value = plano ? (plano.produtos || '') : 'Ilimitado';
    document.getElementById('plano-form-desc').value = plano ? (plano.descricao || '') : '';
    document.getElementById('plano-form-destaque').checked = plano ? Boolean(plano.destaque) : false;
    document.getElementById('plano-form-ativo').checked = plano ? (plano.ativo !== false) : true;

    const mods = plano ? (plano.modulos || []) : ['pdv', 'vendas', 'fiscal', 'estoque', 'financeiro', 'caixa', 'compras', 'relatorios', 'agenda', 'site', 'suporte'];
    const chkKeys = ['pdv', 'vendas', 'fiscal', 'estoque', 'financeiro', 'caixa', 'compras', 'relatorios', 'agenda', 'site', 'ia', 'marketing', 'suporte'];
    chkKeys.forEach(k => {
        const el = document.getElementById(`mod-${k}`);
        if (el) el.checked = mods.includes(k);
    });

    const rels = (plano && Array.isArray(plano.relatoriosPermitidos)) ? plano.relatoriosPermitidos : (plano ? (PLANOS_PADRAO.find(p => p.id === plano.id)?.relatoriosPermitidos || TODOS_RELATORIOS_SAAS) : [...TODOS_RELATORIOS_SAAS]);
    TODOS_RELATORIOS_SAAS.forEach(r => {
        const el = document.getElementById(`rel-${r}`);
        if (el) el.checked = rels.includes(r);
    });

    if (titulo) {
        titulo.innerHTML = plano ? '<i class="fa-solid fa-pen-to-square text-blue-400"></i> Editar Plano SaaS' : '<i class="fa-solid fa-layer-group text-blue-400"></i> Cadastrar Novo Plano';
    }

    modal.classList.remove('hidden');
}
window.abrirModalPlano = abrirModalPlano;

function marcarTodosRelatoriosPlano(marcar) {
    TODOS_RELATORIOS_SAAS.forEach(r => {
        const el = document.getElementById(`rel-${r}`);
        if (el) el.checked = Boolean(marcar);
    });
}
window.marcarTodosRelatoriosPlano = marcarTodosRelatoriosPlano;

function fecharModalPlano() {
    const modal = document.getElementById('modal-plano');
    if (modal) modal.classList.add('hidden');
}
window.fecharModalPlano = fecharModalPlano;

function editarPlanoMaster(planoId) {
    const p = listaPlanos.find(x => x.id === planoId);
    if (p) abrirModalPlano(p);
}
window.editarPlanoMaster = editarPlanoMaster;

async function salvarPlanoMaster(e) {
    if (e) e.preventDefault();

    let id = document.getElementById('plano-form-id').value;
    const sistemaId = document.getElementById('plano-form-sistema')?.value || 'fc_gestao';
    const nome = document.getElementById('plano-form-nome').value.trim();
    const preco = parseFloat(document.getElementById('plano-form-preco').value) || 0;
    const ciclo = document.getElementById('plano-form-ciclo').value;
    const usuarios = document.getElementById('plano-form-usuarios').value.trim();
    const produtos = document.getElementById('plano-form-produtos').value.trim();
    const desc = document.getElementById('plano-form-desc').value.trim();
    const destaque = document.getElementById('plano-form-destaque').checked;
    const ativo = document.getElementById('plano-form-ativo').checked;

    const modulos = [];
    const chkKeys = ['pdv', 'vendas', 'fiscal', 'estoque', 'financeiro', 'caixa', 'compras', 'relatorios', 'agenda', 'site', 'ia', 'marketing', 'suporte'];
    chkKeys.forEach(k => {
        const el = document.getElementById(`mod-${k}`);
        if (el && el.checked) modulos.push(k);
    });

    const relatoriosPermitidos = [];
    TODOS_RELATORIOS_SAAS.forEach(r => {
        const el = document.getElementById(`rel-${r}`);
        if (el && el.checked) relatoriosPermitidos.push(r);
    });

    let limiteUsuarios = 999999;
    if (!/ilimitad/i.test(usuarios)) {
        const parsed = parseInt(usuarios.replace(/\D+/g, ''), 10);
        if (!isNaN(parsed) && parsed > 0) limiteUsuarios = parsed;
    }

    if (!id) {
        id = 'plano_' + Date.now().toString(36);
    }

    const payload = {
        id: id,
        sistemaId: sistemaId,
        nome: nome,
        preco: preco,
        ciclo: ciclo,
        usuarios: usuarios,
        limiteUsuarios: limiteUsuarios,
        produtos: produtos,
        descricao: desc,
        modulos: modulos,
        relatoriosPermitidos: relatoriosPermitidos,
        destaque: destaque,
        ativo: ativo,
        ultimaAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        await firebase.firestore().collection('planos_saas').doc(id).set(payload, { merge: true });

        const idx = listaPlanos.findIndex(x => x.id === id);
        if (idx !== -1) listaPlanos[idx] = payload;
        else listaPlanos.push(payload);

        fecharModalPlano();
        popularFiltroSistemasPlanos();
        renderizarGridPlanosMaster();
        atualizarSelectsDePlanos();
        if (typeof renderizarGridSistemasMaster === 'function') renderizarGridSistemasMaster();
        showToast('Plano salvo com sucesso!', 'success');

    } catch (err) {
        console.error("Erro ao salvar plano:", err);
        showToast('Erro ao salvar plano: ' + err.message, 'error');
    }
}
window.salvarPlanoMaster = salvarPlanoMaster;

async function excluirPlanoMaster(planoId) {
    const p = listaPlanos.find(x => x.id === planoId);
    if (!p) return;

    if (!confirm(`Tem certeza que deseja excluir o plano "${p.nome}"?`)) return;

    try {
        await firebase.firestore().collection('planos_saas').doc(planoId).delete();
        listaPlanos = listaPlanos.filter(x => x.id !== planoId);
        popularFiltroSistemasPlanos();
        renderizarGridPlanosMaster();
        atualizarSelectsDePlanos();
        if (typeof renderizarGridSistemasMaster === 'function') renderizarGridSistemasMaster();
        showToast('Plano excluído com sucesso!', 'success');
    } catch (err) {
        console.error(err);
        showToast('Erro ao excluir: ' + err.message, 'error');
    }
}
window.excluirPlanoMaster = excluirPlanoMaster;

// ==========================================
// MÓDULO 4: CONTRATOS & TERMOS (A4 JURÍDICO)
// ==========================================
function popularSelectEmpresasContrato() {
    const sel = document.getElementById('contrato-select-empresa');
    if (!sel) return;

    const valAtual = sel.value;
    sel.innerHTML = '<option value="">Selecione uma empresa...</option>' + listaLojas.map(l => {
        const nome = l.nomeEmpresa || l.nome || 'Loja';
        const doc = l.configEmpresa?.cnpj || l.cnpj || l.id;
        return `<option value="${l.id}">${nome} (${doc})</option>`;
    }).join('');

    if (valAtual && listaLojas.some(l => l.id === valAtual)) {
        sel.value = valAtual;
    }
}

function gerarContratoParaLoja(empresaId) {
    navegarMaster('contratos');
    const sel = document.getElementById('contrato-select-empresa');
    if (sel) {
        sel.value = empresaId;
        selecionarEmpresaParaContrato();
    }
}
window.gerarContratoParaLoja = gerarContratoParaLoja;

function selecionarEmpresaParaContrato() {
    const sel = document.getElementById('contrato-select-empresa');
    const container = document.getElementById('area-impressao-contrato');
    if (!sel || !container) return;

    const empresaId = sel.value;
    if (!empresaId) {
        container.innerHTML = `
            <div class="text-center py-16 text-slate-400 font-sans">
                <i class="fa-solid fa-file-contract text-4xl text-slate-300 mb-3"></i>
                <p class="text-base font-medium text-slate-600">Selecione uma empresa acima para visualizar e gerar o contrato formal de prestação de serviços SaaS.</p>
            </div>
        `;
        return;
    }

    const loja = listaLojas.find(l => l.id === empresaId);
    if (!loja) return;

    const emp = loja.configEmpresa || {};
    const razaoSocial = emp.nome || loja.nomeEmpresa || 'EMPRESA CONTRATANTE';
    const nomeFantasia = emp.fantasia || loja.nomeEmpresa || razaoSocial;
    const cnpj = emp.cnpj || loja.cnpj || '00.000.000/0000-00';
    const ie = emp.ie || 'ISENTO';
    const endereco = `${emp.rua || 'Logradouro'}, Nº ${emp.numero || 'S/N'}, ${emp.bairro || 'Bairro'}, ${emp.cidade || 'Cidade'} - ${emp.uf || 'GO'}, CEP: ${emp.cep || '74000-000'}`;
    const responsavel = loja.donoInfo?.nome || 'Representante Legal';
    const emailDono = loja.donoInfo?.email || 'contato@empresa.com';
    const whatsapp = loja.whatsapp || emp.telefone || '(00) 00000-0000';
    const sisIdLoja = loja.sistemaId || 'fc_gestao';
    const sisLojaObj = listaSistemas.find(s => s.id === sisIdLoja);
    const nomeSistemaContrato = sisLojaObj ? sisLojaObj.nome : 'FC-Gestão';

    const planoKey = loja.plano || 'PRO';
    const planoObj = listaPlanos.find(p => p.id === planoKey || p.nome.toUpperCase().includes(planoKey.toUpperCase())) || { nome: planoKey, ciclo: 'mensal', usuarios: '5 Usuários', produtos: 'Ilimitado' };
    const valorNum = Number(loja.valorMensalidade || 99.00);
    const valorFmt = valorNum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const dataVenc = formatarDataBr(loja.dataVencimento);
    const diaVenc = loja.dataVencimento ? loja.dataVencimento.split('-')[2] : '10';

    // Data de emissão por extenso
    const hoje = new Date();
    const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const dataExtenso = `${hoje.getDate()} de ${meses[hoje.getMonth()]} de ${hoje.getFullYear()}`;

    // Dados dinâmicos do Fundador / Empresa SaaS
    const nomeFundador = dadosFundadorMaster.nome || 'PAULO AUGUSTO SILVA BORGES';
    const empresaFundador = dadosFundadorMaster.empresa || 'SAAS MASTER TECNOLOGIA';
    const docFundador = dadosFundadorMaster.documento ? `, inscrito sob o CPF/CNPJ nº ${dadosFundadorMaster.documento}` : '';
    const cidadeUfFundador = dadosFundadorMaster.cidadeUf || 'Goiânia - GO';
    const chavePixFundador = dadosFundadorMaster.pixChave || 'pauloaugusto.silvaborges@gmail.com';
    const titularPixFundador = dadosFundadorMaster.pixTitular || nomeFundador;
    const bancoPixFundador = dadosFundadorMaster.pixBanco ? ` (${dadosFundadorMaster.pixBanco})` : '';

    container.innerHTML = `
        <div class="space-y-6 text-justify">
            <!-- CABEÇALHO DO CONTRATO -->
            <div class="text-center border-b-2 border-slate-900 pb-4">
                <h1 class="text-lg md:text-xl font-bold uppercase tracking-wider">CONTRATO DE LICENÇA DE USO DE SOFTWARE (SaaS) E PRESTAÇÃO DE SERVIÇOS</h1>
                <p class="text-xs uppercase text-slate-600 mt-1 font-sans">Instrumento Particular de Contratação Tecnológica e Gestão Empresarial</p>
            </div>

            <!-- PARTES -->
            <div>
                <h2 class="font-bold uppercase text-sm border-b border-slate-300 pb-1 mb-2">1. DAS PARTES CONTRATANTES</h2>
                <p class="mb-2">
                    <strong>CONTRATADA:</strong> <strong>${nomeFundador.toUpperCase()} / ${empresaFundador.toUpperCase()}</strong>${docFundador}, com sede e foro na Comarca de ${cidadeUfFundador}, titular e desenvolvedor da plataforma em nuvem, contato administrativo e chave PIX: <strong>${chavePixFundador}</strong>.
                </p>
                <p>
                    <strong>CONTRATANTE:</strong> <strong>${razaoSocial}</strong> (Nome Fantasia: <em>${nomeFantasia}</em>), inscrita no CNPJ/CPF sob nº <strong>${cnpj}</strong>, Inscrição Estadual: <strong>${ie}</strong>, com sede em: <strong>${endereco}</strong>, neste ato representada por <strong>${responsavel}</strong>, e-mail: <strong>${emailDono}</strong>, WhatsApp: <strong>${whatsapp}</strong>.
                </p>
            </div>

            <!-- OBJETO -->
            <div>
                <h2 class="font-bold uppercase text-sm border-b border-slate-300 pb-1 mb-2">2. CLÁUSULA PRIMEIRA - DO OBJETO</h2>
                <p>
                    O presente instrumento tem como objeto a concessão, pela CONTRATADA à CONTRATANTE, de licença temporária, intransferível e não exclusiva de uso da plataforma web de software <strong>${nomeSistemaContrato} (${empresaFundador})</strong>, incluindo armazenamento em nuvem, módulos contratados, manutenção preventiva e atualizações contínuas.
                </p>
            </div>

            <!-- PLANO E RECURSOS -->
            <div>
                <h2 class="font-bold uppercase text-sm border-b border-slate-300 pb-1 mb-2">3. CLÁUSULA SEGUNDA - DO PLANO E RECURSOS CONTRATADOS</h2>
                <p>
                    A CONTRATANTE adere expressamente ao <strong>PLANO ${planoObj.nome.toUpperCase()}</strong>, contemplando:
                </p>
                <ul class="list-disc pl-6 my-2 space-y-1 font-sans text-xs">
                    <li>Acesso operacional via web em computadores, tablets e smartphones;</li>
                    <li>Capacidade de usuários autorizados: <strong>${planoObj.usuarios || 'Conforme especificação do plano'}</strong>;</li>
                    <li>Limite de produtos e cadastros: <strong>${planoObj.produtos || 'Ilimitado'}</strong>;</li>
                    <li>Módulos inclusos: Frente de Caixa (PDV), Emissão Fiscal (NF-e/NFC-e), Gestão Financeira, Estoque e Catálogo Digital.</li>
                </ul>
            </div>

            <!-- PREÇO E PAGAMENTO -->
            <div>
                <h2 class="font-bold uppercase text-sm border-b border-slate-300 pb-1 mb-2">4. CLÁUSULA TERCEIRA - DO PREÇO E FORMA DE PAGAMENTO</h2>
                <p>
                    Pela prestação dos serviços e licença de uso, a CONTRATANTE pagará à CONTRATADA o valor mensal fixo de <strong>${valorFmt} (${valorNum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})</strong>.
                </p>
                <p class="mt-1">
                    <strong>Parágrafo Primeiro:</strong> O vencimento da mensalidade ocorrerá todo <strong>dia ${diaVenc}</strong> de cada mês, sendo o pagamento realizado preferencialmente via <strong>PIX para a chave: ${chavePixFundador}</strong> (Titular: ${titularPixFundador}${bancoPixFundador}).
                </p>
            </div>

            <!-- INADIMPLÊNCIA E BLOQUEIO -->
            <div>
                <h2 class="font-bold uppercase text-sm border-b border-slate-300 pb-1 mb-2">5. CLÁUSULA QUARTA - DA SUSPENSÃO POR INADIMPLÊNCIA</h2>
                <p>
                    O não pagamento da mensalidade no vencimento sujeitará a CONTRATANTE a aviso preventivo de cobrança. Ultrapassado o prazo de <strong>10 (dez) dias corridos de tolerância</strong>, a CONTRATADA reserva-se o direito de suspender temporariamente o acesso de todos os logins da empresa ao sistema, mantendo os dados preservados em segurança até a devida regularização financeira.
                </p>
            </div>

            <!-- DISPONIBILIDADE E SUPORTE -->
            <div>
                <h2 class="font-bold uppercase text-sm border-b border-slate-300 pb-1 mb-2">6. CLÁUSULA QUINTA - DO NÍVEL DE SERVIÇO (SLA) E SUPORTE</h2>
                <p>
                    A CONTRATADA assegura a disponibilidade média da plataforma de 99,0% ao mês, bem como rotinas diárias de backup de segurança em servidores de alta confiabilidade. O suporte técnico é prestado em horário comercial via WhatsApp e canais digitais.
                </p>
            </div>

            <!-- LGPD E CONFIDENCIALIDADE -->
            <div>
                <h2 class="font-bold uppercase text-sm border-b border-slate-300 pb-1 mb-2">7. CLÁUSULA SEXTA - DA PROTEÇÃO DE DADOS (LGPD)</h2>
                <p>
                    As partes comprometem-se ao cumprimento irrestrito da Lei Geral de Proteção de Dados Pessoais (Lei Federal nº 13.709/2018). Todas as informações financeiras, fiscais e de clientes cadastradas pela CONTRATANTE são de sua exclusiva titularidade e confidencialidade.
                </p>
            </div>

            <!-- VIGÊNCIA E RESCISÃO -->
            <div>
                <h2 class="font-bold uppercase text-sm border-b border-slate-300 pb-1 mb-2">8. CLÁUSULA SÉTIMA - DA VIGÊNCIA E RESCISÃO</h2>
                <p>
                    O presente contrato vigora por prazo indeterminado. Qualquer das partes poderá rescindi-lo a qualquer momento, sem imposição de multa rescisória, mediante aviso prévio e formal por escrito com antecedência mínima de 30 (trinta) dias.
                </p>
            </div>

            <!-- FORO -->
            <div>
                <h2 class="font-bold uppercase text-sm border-b border-slate-300 pb-1 mb-2">9. CLÁUSULA OITAVA - DO FORO</h2>
                <p>
                    Para dirimir quaisquer controvérsias oriundas deste instrumento, as partes elegem o Foro da Comarca de ${cidadeUfFundador}, com renúncia expressa a qualquer outro.
                </p>
            </div>

            <!-- DATA E ASSINATURAS -->
            <div class="pt-6 border-t border-slate-300 text-center font-sans space-y-8">
                <p class="font-semibold text-slate-800">${cidadeUfFundador}, ${dataExtenso}.</p>

                <div class="grid grid-cols-2 gap-8 pt-8">
                    <div>
                        <div class="border-t-2 border-slate-900 mx-auto w-4/5 pt-1"></div>
                        <p class="font-bold text-xs uppercase">${nomeFundador}</p>
                        <p class="text-[10px] text-slate-600">CONTRATADA (${empresaFundador})</p>
                    </div>
                    <div>
                        <div class="border-t-2 border-slate-900 mx-auto w-4/5 pt-1"></div>
                        <p class="font-bold text-xs uppercase">${responsavel}</p>
                        <p class="text-[10px] text-slate-600">CONTRATANTE (${nomeFantasia})</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-8 pt-4 text-[10px] text-slate-500">
                    <div>Testemunha 1: ____________________________</div>
                    <div>Testemunha 2: ____________________________</div>
                </div>
            </div>
        </div>
    `;
}
window.selecionarEmpresaParaContrato = selecionarEmpresaParaContrato;

// Disparo de Impressão / PDF do Contrato (A4 nativo)
function imprimirContratoA4() {
    const sel = document.getElementById('contrato-select-empresa');
    if (!sel || !sel.value) {
        showToast('Selecione uma empresa antes de imprimir o contrato.', 'info');
        return;
    }
    window.print();
}
window.imprimirContratoA4 = imprimirContratoA4;

// Enviar Contrato no WhatsApp do Cliente
function enviarContratoWhatsApp() {
    const sel = document.getElementById('contrato-select-empresa');
    if (!sel || !sel.value) {
        showToast('Selecione uma empresa primeiro.', 'info');
        return;
    }

    const loja = listaLojas.find(l => l.id === sel.value);
    if (!loja) return;

    let wpp = loja.whatsapp || '';
    let wppLimpo = String(wpp).replace(/\D/g, '');

    if (!wppLimpo || wppLimpo.length < 10) {
        wpp = prompt('Informe o WhatsApp do cliente para enviar o termo (DDD + número):', wpp);
        if (!wpp) return;
        wppLimpo = String(wpp).replace(/\D/g, '');
    }

    if (wppLimpo.length === 10 || wppLimpo.length === 11) {
        wppLimpo = '55' + wppLimpo;
    }

    const nomeLoja = loja.nomeEmpresa || loja.nome || 'Loja';
    const plano = loja.plano || 'PRO';
    const valor = Number(loja.valorMensalidade || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const chavePix = dadosFundadorMaster.pixChave || 'pauloaugusto.silvaborges@gmail.com';
    const titularPix = dadosFundadorMaster.pixTitular ? ` (${dadosFundadorMaster.pixTitular})` : '';

    const msg = `Olá! Segue o resumo do *Termo de Adesão e Licença de Uso SaaS* da sua empresa *${nomeLoja}*:\n\n` +
        `📦 *Plano Contratado:* ${plano}\n` +
        `💰 *Valor da Mensalidade:* ${valor}\n` +
        `🔑 *Chave PIX Oficial:* ${chavePix}${titularPix}\n` +
        `📄 *Status do Acesso:* 🟢 Liberado\n\n` +
        `O seu contrato formal de prestação de serviços foi emitido pelo nosso sistema e encontra-se registrado. Qualquer dúvida jurídica ou operacional estamos à disposição!`;

    window.open(`https://wa.me/${wppLimpo}?text=${encodeURIComponent(msg)}`, '_blank');
}
window.enviarContratoWhatsApp = enviarContratoWhatsApp;

// Copiar texto puro do contrato
function copiarTextoContrato() {
    const container = document.getElementById('area-impressao-contrato');
    if (!container) return;

    const texto = container.innerText;
    navigator.clipboard.writeText(texto).then(() => {
        showToast('Texto do contrato copiado para a área de transferência!', 'success');
    }).catch(() => {
        showToast('Erro ao copiar texto.', 'error');
    });
}
window.copiarTextoContrato = copiarTextoContrato;

// ==========================================
// MÓDULO 5: CADASTRO MANUAL DE NOVA LOJA
// ==========================================
function abrirModalNovaLoja() {
    popularSelectsSistemas();
    const sisId = document.getElementById('nova-loja-sistema')?.value || 'fc_gestao';
    popularSelectPlanosPorSistema('nova-loja-plano', sisId);
    const selPlano = document.getElementById('nova-loja-plano');
    if (selPlano && selPlano.value) {
        atualizarValorPorPlanoSelecionado(selPlano.value, 'nova-loja-valor');
    }
    const modal = document.getElementById('modal-nova-loja');
    if (modal) modal.classList.remove('hidden');
}
window.abrirModalNovaLoja = abrirModalNovaLoja;

function fecharModalNovaLoja() {
    const modal = document.getElementById('modal-nova-loja');
    if (modal) modal.classList.add('hidden');
}
window.fecharModalNovaLoja = fecharModalNovaLoja;

async function cadastrarLojaManual(e) {
    if (e) e.preventDefault();

    const nome = document.getElementById('nova-loja-nome').value.trim();
    const sistemaId = document.getElementById('nova-loja-sistema')?.value || 'fc_gestao';
    const email = document.getElementById('nova-loja-email').value.trim().toLowerCase();
    const senha = document.getElementById('nova-loja-senha').value;
    const wpp = document.getElementById('nova-loja-whatsapp').value.trim();
    const plano = document.getElementById('nova-loja-plano').value || 'plano_pro';
    const valor = parseFloat(document.getElementById('nova-loja-valor').value) || 99.00;
    const cnpj = document.getElementById('nova-loja-cnpj').value.trim();
    const btn = document.getElementById('btn-criar-loja-manual');

    if (!nome || !email || !senha) {
        showToast('Preencha os campos obrigatórios!', 'error');
        return;
    }

    try {
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Criando Loja...';
        btn.disabled = true;

        // Cria o usuário usando uma instância secundária para não deslogar o Paulo Augusto
        let secApp;
        try {
            secApp = firebase.app('SecondaryMaster');
        } catch(e) {
            secApp = firebase.initializeApp(firebaseConfig, 'SecondaryMaster');
        }

        const cred = await secApp.auth().createUserWithEmailAndPassword(email, senha);
        const uid = cred.user.uid;
        await secApp.auth().signOut();

        const empresaId = 'loja_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
        const db = firebase.firestore();
        const batch = db.batch();

        // 1. Mapeamento global de usuário
        batch.set(db.collection('usuarios').doc(uid), {
            email: email,
            empresaId: empresaId,
            role: 'admin',
            nome: nome,
            telefone: wpp,
            criadoPorMaster: true,
            dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
        });

        // 2. Data de vencimento em 30 dias
        const venc = new Date();
        venc.setDate(venc.getDate() + 30);
        const dataVencStr = venc.toISOString().split('T')[0];

        // 3. Documento da empresa
        const planoObj = listaPlanos.find(p => p.id === plano || p.id === 'plano_' + String(plano).toLowerCase()) || PLANOS_PADRAO[1];
        const modsIniciais = planoObj.modulos || ['pdv', 'vendas', 'fiscal', 'estoque', 'financeiro', 'site'];

        batch.set(db.collection('empresas').doc(empresaId), {
            nomeEmpresa: nome,
            sistemaId: sistemaId,
            donoUid: uid,
            whatsapp: wpp,
            cnpj: cnpj,
            plano: plano,
            valorMensalidade: valor,
            dataVencimento: dataVencStr,
            status: 'ATIVO',
            emailAcesso: email,
            senhaAcesso: senha,
            modulosLiberados: modsIniciais,
            relatoriosPermitidos: planoObj.relatoriosPermitidos || TODOS_RELATORIOS_SAAS,
            dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
        });

        // 4. Perfil admin na empresa
        batch.set(db.collection('empresas').doc(empresaId).collection('funcionarios').doc(uid), {
            nome: 'Administrador',
            email: email,
            isAdmin: true,
            perm_dashboard: true,
            perm_pdv: true,
            perm_cadastros: true,
            perm_gestao: true,
            perm_config: true,
            status: 'ativo'
        });

        // 5. Configuração cadastral e Caixa inicial
        batch.set(db.collection('empresas').doc(empresaId).collection('configuracoes').doc('config'), {
            empresa: {
                nome: nome,
                fantasia: nome,
                cnpj: cnpj,
                telefone: wpp
            },
            pdv: { permite_estoque_negativo: false }
        });
        batch.set(db.collection('empresas').doc(empresaId).collection('caixa').doc('caixa_atual'), {
            status: 'fechado', saldo: 0, historico: []
        });

        await batch.commit();

        fecharModalNovaLoja();
        showToast(`Loja "${nome}" criada e liberada com sucesso!`, 'success');
        await carregarTodasAsLojasMaster();

    } catch (err) {
        console.error(err);
        showToast('Erro ao criar loja: ' + err.message, 'error');
    } finally {
        btn.innerHTML = 'Criar e Liberar Loja';
        btn.disabled = false;
    }
}
window.cadastrarLojaManual = cadastrarLojaManual;

// ==========================================
// MÓDULO 5: CONFIGURAÇÃO GLOBAL DO SAAS (GEMINI AI MASTER)
// ==========================================
function toggleVerGeminiGlobal() {
    const inp = document.getElementById('config-global-gemini-key');
    const icone = document.getElementById('olho-gemini-global');
    if (!inp) return;
    if (inp.type === 'password') {
        inp.type = 'text';
        if (icone) { icone.classList.remove('fa-eye'); icone.classList.add('fa-eye-slash'); }
    } else {
        inp.type = 'password';
        if (icone) { icone.classList.remove('fa-eye-slash'); icone.classList.add('fa-eye'); }
    }
}
window.toggleVerGeminiGlobal = toggleVerGeminiGlobal;

async function abrirModalConfigGlobalSaaS() {
    const modal = document.getElementById('modal-config-global-saas');
    const inputKey = document.getElementById('config-global-gemini-key');
    const divResult = document.getElementById('resultado-teste-ia-global');
    if (divResult) divResult.classList.add('hidden');

    try {
        const doc = await firebase.firestore().collection('saas_config').doc('master').get();
        if (doc.exists && doc.data().geminiKeyMaster) {
            if (inputKey) inputKey.value = doc.data().geminiKeyMaster;
        } else if (inputKey) {
            inputKey.value = '';
        }
    } catch(err) {
        console.warn("Aviso ao carregar saas_config/master:", err);
    }

    if (modal) modal.classList.remove('hidden');
}
window.abrirModalConfigGlobalSaaS = abrirModalConfigGlobalSaaS;

function fecharModalConfigGlobalSaaS() {
    const modal = document.getElementById('modal-config-global-saas');
    if (modal) modal.classList.add('hidden');
}
window.fecharModalConfigGlobalSaaS = fecharModalConfigGlobalSaaS;

async function testarChaveIAGlobal() {
    const inputKey = document.getElementById('config-global-gemini-key');
    const divResult = document.getElementById('resultado-teste-ia-global');
    if (!inputKey || !divResult) return;

    const key = inputKey.value.trim();
    if (!key) {
        showToast('Insira uma chave do Google Gemini para testar!', 'error');
        return;
    }

    divResult.className = 'p-3 rounded-xl text-xs bg-purple-950/50 border border-purple-800 text-purple-300 flex items-center gap-2';
    divResult.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Conectando à API do Google Gemini AI Studio...';
    divResult.classList.remove('hidden');

    try {
        const modelosParaTestar = ['gemini-3.5-flash-lite', 'gemini-flash-lite-latest', 'gemini-3.5-flash', 'gemini-3.8-flash'];
        let sucesso = false;
        let resposta = '';
        let ultimoErro = '';

        for (const mod of modelosParaTestar) {
            try {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${mod}:generateContent?key=${key}`;
                const resp = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: "Diga apenas: 'Conexão validada com sucesso!'" }] }]
                    })
                });

                const data = await resp.json();
                if (resp.ok && data.candidates && data.candidates.length > 0) {
                    resposta = data.candidates[0]?.content?.parts?.[0]?.text || 'OK';
                    sucesso = true;
                    break;
                } else if (data.error) {
                    ultimoErro = data.error.message || ultimoErro;
                }
            } catch(e) {
                ultimoErro = e.message;
            }
        }

        if (sucesso) {
            divResult.className = 'p-3 rounded-xl text-xs bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 space-y-1';
            divResult.innerHTML = `
                <div class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-circle-check"></i> Chave Válida e Operacional!</div>
                <div class="text-[11px] text-slate-300">Retorno da IA: "<em>${resposta.trim()}</em>"</div>
            `;
            showToast('Chave testada com sucesso!', 'success');
        } else {
            divResult.className = 'p-3 rounded-xl text-xs bg-red-950/50 border border-red-500/40 text-red-300 space-y-1';
            divResult.innerHTML = `
                <div class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-circle-xmark"></i> Falha na Validação Google</div>
                <div class="text-[11px] text-red-200">${ultimoErro || 'Chave rejeitada pela Google.'}</div>
            `;
            showToast('Chave inválida ou bloqueada pela Google!', 'error');
        }
    } catch(err) {
        divResult.className = 'p-3 rounded-xl text-xs bg-red-950/50 border border-red-500/40 text-red-300 space-y-1';
        divResult.innerHTML = `
            <div class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-triangle-exclamation"></i> Erro de Rede</div>
            <div class="text-[11px] text-red-200">${err.message}</div>
        `;
        showToast('Erro ao testar chave: ' + err.message, 'error');
    }
}
window.testarChaveIAGlobal = testarChaveIAGlobal;

async function salvarConfigGlobalSaaSMaster(e) {
    if (e) e.preventDefault();
    const inputKey = document.getElementById('config-global-gemini-key');
    const btn = document.getElementById('btn-salvar-config-global');
    if (!inputKey) return;

    const key = inputKey.value.trim();
    if (!key) {
        showToast('Insira a chave do Google Gemini!', 'error');
        return;
    }

    try {
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gravando Chave Mestra...';
        }

        await firebase.firestore().collection('saas_config').doc('master').set({
            geminiKeyMaster: key,
            atualizadoPor: 'pauloaugusto.silvaborges@gmail.com',
            ultimaAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        fecharModalConfigGlobalSaaS();
        showToast('Chave Mestra Global de IA configurada com sucesso para todo o SaaS!', 'success');
    } catch (err) {
        console.error("Erro ao salvar chave global:", err);
        showToast('Erro ao salvar configuração: ' + err.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Salvar Chave Global';
        }
    }
}
window.salvarConfigGlobalSaaSMaster = salvarConfigGlobalSaaSMaster;

// ==========================================
// CONFIGURAÇÃO DE IDENTIDADE & PAGAMENTO DO FUNDADOR
// ==========================================
async function carregarPerfilFundadorMaster() {
    try {
        const docRef = firebase.firestore().collection('saas_config').doc('fundador');
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            dadosFundadorMaster = { ...DADOS_FUNDADOR_PADRAO, ...docSnap.data() };
        } else {
            dadosFundadorMaster = { ...DADOS_FUNDADOR_PADRAO };
            // Cria registro inicial
            await docRef.set(dadosFundadorMaster, { merge: true });
        }

        // Atualiza UI da Sidebar
        atualizarVisualSidebarFundador();

    } catch (err) {
        console.warn("[SaaS Master] Aviso ao carregar perfil do fundador:", err.message);
    }
}
window.carregarPerfilFundadorMaster = carregarPerfilFundadorMaster;

function atualizarVisualSidebarFundador() {
    const elNome = document.getElementById('master-nome-display');
    const elEmail = document.getElementById('master-email-display');
    const elSigla = document.getElementById('master-avatar-sigla');

    if (elNome) elNome.innerText = dadosFundadorMaster.nome || 'Paulo Augusto';
    if (elEmail) elEmail.innerText = dadosFundadorMaster.email || 'pauloaugusto.silvaborges@gmail.com';
    if (elSigla) {
        const partes = (dadosFundadorMaster.nome || 'PA').trim().split(/\s+/);
        let sigla = 'PA';
        if (partes.length >= 2) {
            sigla = (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
        } else if (partes.length === 1 && partes[0].length >= 2) {
            sigla = partes[0].substring(0, 2).toUpperCase();
        }
        elSigla.innerText = sigla;
    }
}

function abrirModalPerfilFundador() {
    const modal = document.getElementById('modal-perfil-fundador');
    if (!modal) return;

    // Preenche os campos com os dados atuais
    const fNome = document.getElementById('fundador-nome');
    const fEmpresa = document.getElementById('fundador-empresa');
    const fEmail = document.getElementById('fundador-email');
    const fWhatsapp = document.getElementById('fundador-whatsapp');
    const fDocumento = document.getElementById('fundador-documento');
    const fCidadeUf = document.getElementById('fundador-cidade-uf');
    const fWebsite = document.getElementById('fundador-website');

    const fPixTipo = document.getElementById('fundador-pix-tipo');
    const fPixChave = document.getElementById('fundador-pix-chave');
    const fPixTitular = document.getElementById('fundador-pix-titular');
    const fPixBanco = document.getElementById('fundador-pix-banco');
    const fOutrasFormas = document.getElementById('fundador-outras-formas');

    if (fNome) fNome.value = dadosFundadorMaster.nome || '';
    if (fEmpresa) fEmpresa.value = dadosFundadorMaster.empresa || '';
    if (fEmail) fEmail.value = dadosFundadorMaster.email || '';
    if (fWhatsapp) fWhatsapp.value = dadosFundadorMaster.whatsapp || '';
    if (fDocumento) fDocumento.value = dadosFundadorMaster.documento || '';
    if (fCidadeUf) fCidadeUf.value = dadosFundadorMaster.cidadeUf || '';
    if (fWebsite) fWebsite.value = dadosFundadorMaster.website || '';

    if (fPixTipo) fPixTipo.value = dadosFundadorMaster.pixTipo || 'email';
    if (fPixChave) fPixChave.value = dadosFundadorMaster.pixChave || '';
    if (fPixTitular) fPixTitular.value = dadosFundadorMaster.pixTitular || '';
    if (fPixBanco) fPixBanco.value = dadosFundadorMaster.pixBanco || '';
    if (fOutrasFormas) fOutrasFormas.value = dadosFundadorMaster.outrasFormas || '';

    modal.classList.remove('hidden');
}
window.abrirModalPerfilFundador = abrirModalPerfilFundador;

function fecharModalPerfilFundador() {
    const modal = document.getElementById('modal-perfil-fundador');
    if (modal) modal.classList.add('hidden');
}
window.fecharModalPerfilFundador = fecharModalPerfilFundador;

async function salvarPerfilFundadorMaster(e) {
    if (e) e.preventDefault();

    const btn = document.getElementById('btn-salvar-perfil-fundador');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';
    }

    try {
        const dadosNovos = {
            nome: document.getElementById('fundador-nome')?.value.trim() || '',
            empresa: document.getElementById('fundador-empresa')?.value.trim() || '',
            email: document.getElementById('fundador-email')?.value.trim() || '',
            whatsapp: document.getElementById('fundador-whatsapp')?.value.trim() || '',
            documento: document.getElementById('fundador-documento')?.value.trim() || '',
            cidadeUf: document.getElementById('fundador-cidade-uf')?.value.trim() || 'Goiânia - GO',
            website: document.getElementById('fundador-website')?.value.trim() || '',
            pixTipo: document.getElementById('fundador-pix-tipo')?.value || 'email',
            pixChave: document.getElementById('fundador-pix-chave')?.value.trim() || '',
            pixTitular: document.getElementById('fundador-pix-titular')?.value.trim() || '',
            pixBanco: document.getElementById('fundador-pix-banco')?.value.trim() || '',
            outrasFormas: document.getElementById('fundador-outras-formas')?.value.trim() || '',
            atualizadoEm: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (!dadosNovos.nome || !dadosNovos.pixChave) {
            showToast('Informe ao menos seu Nome e sua Chave PIX!', 'error');
            return;
        }

        await firebase.firestore().collection('saas_config').doc('fundador').set(dadosNovos, { merge: true });

        dadosFundadorMaster = { ...dadosFundadorMaster, ...dadosNovos };
        atualizarVisualSidebarFundador();

        // Se estiver na aba de contratos, atualiza o contrato exibido
        const selContrato = document.getElementById('contrato-select-empresa');
        if (selContrato && selContrato.value && typeof selecionarEmpresaParaContrato === 'function') {
            selecionarEmpresaParaContrato();
        }

        showToast('Dados do Fundador e Chaves de Pagamento salvos com sucesso!', 'success');
        fecharModalPerfilFundador();

    } catch (err) {
        console.error("Erro ao salvar perfil do fundador:", err);
        showToast('Erro ao salvar dados: ' + err.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Meus Dados & PIX';
        }
    }
}
window.salvarPerfilFundadorMaster = salvarPerfilFundadorMaster;

// ==========================================
// MÓDULO 6: ECOSSISTEMA MULTI-SISTEMAS
// ==========================================
async function carregarSistemasMaster() {
    try {
        const snap = await firebase.firestore().collection('sistemas_saas').get();
        if (snap.empty) {
            // Inicializa sistemas padrão no Firestore
            const batch = firebase.firestore().batch();
            SISTEMAS_PADRAO.forEach(sis => {
                const ref = firebase.firestore().collection('sistemas_saas').doc(sis.id);
                batch.set(ref, sis);
            });
            await batch.commit();
            listaSistemas = [...SISTEMAS_PADRAO];
        } else {
            listaSistemas = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }

        popularSelectsSistemas();
        renderizarGridSistemasMaster();

    } catch (err) {
        console.error("Erro ao carregar sistemas:", err);
        listaSistemas = [...SISTEMAS_PADRAO];
        popularSelectsSistemas();
        renderizarGridSistemasMaster();
    }
}
window.carregarSistemasMaster = carregarSistemasMaster;

function popularSelectsSistemas() {
    // 1. Filtro de sistemas na listagem de lojas
    const selFiltro = document.getElementById('filtro-sistema');
    if (selFiltro) {
        const valAtual = selFiltro.value || 'todos';
        let htmlFiltro = `<option value="todos">Todos os Sistemas (${listaLojas.length})</option>`;
        listaSistemas.forEach(sis => {
            const count = listaLojas.filter(l => (l.sistemaId || 'fc_gestao') === sis.id).length;
            htmlFiltro += `<option value="${sis.id}">${sis.nome} (${count})</option>`;
        });
        selFiltro.innerHTML = htmlFiltro;
        if (listaSistemas.some(s => s.id === valAtual) || valAtual === 'todos') {
            selFiltro.value = valAtual;
        }
    }

    // 2. Select no cadastro de nova loja
    const selNovaLoja = document.getElementById('nova-loja-sistema');
    if (selNovaLoja) {
        selNovaLoja.innerHTML = listaSistemas.map(sis => `
            <option value="${sis.id}">${sis.nome} (${sis.ramo})</option>
        `).join('');
    }

    // 3. Select no dossiê da empresa (Tab 2)
    const selDossie = document.getElementById('dossie-ass-sistema');
    if (selDossie) {
        selDossie.innerHTML = listaSistemas.map(sis => `
            <option value="${sis.id}">${sis.nome} (${sis.ramo})</option>
        `).join('');
        if (lojaDossieAtual) {
            selDossie.value = lojaDossieAtual.sistemaId || 'fc_gestao';
        }
    }

    // 4. Filtro de sistemas no Catálogo de Planos
    popularFiltroSistemasPlanos();

    // 5. Select no modal de criação/edição de plano
    const selPlanoSis = document.getElementById('plano-form-sistema');
    if (selPlanoSis) {
        selPlanoSis.innerHTML = listaSistemas.map(sis => `
            <option value="${sis.id}">${sis.nome} (${sis.ramo})</option>
        `).join('');
    }
}
window.popularSelectsSistemas = popularSelectsSistemas;

function renderizarGridSistemasMaster() {
    const grid = document.getElementById('grid-sistemas');
    if (!grid) return;

    if (listaSistemas.length === 0) {
        grid.innerHTML = `
            <div class="col-span-3 text-center py-16 text-slate-500">
                <i class="fa-solid fa-cubes text-4xl mb-3"></i>
                <p>Nenhum sistema cadastrado. Clique no botão "+ Novo Sistema" para criar.</p>
            </div>
        `;
        return;
    }

    const corMap = {
        amber: {
            bgIcon: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
            badge: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
            gradientBtn: 'from-amber-500 to-yellow-400 text-slate-950 shadow-amber-500/20'
        },
        emerald: {
            bgIcon: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
            badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
            gradientBtn: 'from-emerald-500 to-teal-500 text-slate-950 shadow-emerald-500/20'
        },
        blue: {
            bgIcon: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
            badge: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
            gradientBtn: 'from-blue-500 to-indigo-600 text-white shadow-blue-500/20'
        },
        purple: {
            bgIcon: 'bg-purple-500/15 border-purple-500/30 text-purple-400',
            badge: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
            gradientBtn: 'from-purple-500 to-indigo-600 text-white shadow-purple-500/20'
        },
        rose: {
            bgIcon: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
            badge: 'bg-rose-500/10 text-rose-400 border-rose-500/25',
            gradientBtn: 'from-rose-500 to-pink-600 text-white shadow-rose-500/20'
        },
        cyan: {
            bgIcon: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
            badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
            gradientBtn: 'from-cyan-500 to-blue-600 text-white shadow-cyan-500/20'
        }
    };

    grid.innerHTML = listaSistemas.map(sis => {
        const estilo = corMap[sis.cor] || corMap.amber;
        const lojasDoSistema = listaLojas.filter(l => (l.sistemaId || 'fc_gestao') === sis.id);
        const totalLojas = lojasDoSistema.length;
        const ativas = lojasDoSistema.filter(l => l.status === 'ATIVO').length;
        const mrr = lojasDoSistema.reduce((acc, l) => acc + Number(l.valorMensalidade || 0), 0);
        const mrrFmt = mrr.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const planosDoSistema = listaPlanos.filter(p => (p.sistemaId || 'fc_gestao') === sis.id);

        return `
            <div class="bg-[#0f172a] rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition-all">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <div class="w-14 h-14 rounded-2xl ${estilo.bgIcon} border flex items-center justify-center text-2xl shrink-0 shadow-lg">
                            <i class="fa-solid ${sis.icone || 'fa-cubes'}"></i>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${estilo.badge}">
                                ${sis.status || 'ATIVO'}
                            </span>
                            ${sis.id !== 'fc_gestao' ? `
                                <button onclick="excluirSistemaMaster('${sis.id}')" title="Excluir Sistema" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 flex items-center justify-center text-xs transition-colors">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            ` : ''}
                        </div>
                    </div>

                    <h4 class="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors">${sis.nome}</h4>
                    <p class="text-xs font-semibold text-slate-400 mt-0.5">${sis.ramo}</p>
                    <p class="text-xs text-slate-500 mt-2 min-h-[32px] leading-relaxed">${sis.descricao || 'Solução especializada para automação comercial e financeira.'}</p>

                    <!-- METRICAS DO SISTEMA -->
                    <div class="grid grid-cols-3 gap-2 py-4 my-4 border-y border-slate-800">
                        <div class="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
                            <p class="text-[9px] font-bold text-slate-400 uppercase">Lojas</p>
                            <h5 class="text-sm font-black text-white mt-0.5">${totalLojas} <span class="text-[9px] font-bold text-emerald-400 font-sans">(${ativas})</span></h5>
                        </div>
                        <div class="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
                            <p class="text-[9px] font-bold text-slate-400 uppercase">Planos</p>
                            <h5 class="text-sm font-black text-blue-400 mt-0.5">${planosDoSistema.length}</h5>
                        </div>
                        <div class="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
                            <p class="text-[9px] font-bold text-slate-400 uppercase">MRR</p>
                            <h5 class="text-xs font-black text-emerald-400 mt-1">${mrrFmt}</h5>
                        </div>
                    </div>
                </div>

                <div class="space-y-2 pt-2">
                    <div class="flex items-center gap-1.5">
                        <button onclick="filtrarLojasPorSistema('${sis.id}')" class="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 px-2 rounded-xl text-xs flex items-center justify-center gap-1 transition-all border border-slate-700" title="Ver Lojas deste Sistema">
                            <i class="fa-solid fa-store text-[11px]"></i> Lojas (${totalLojas})
                        </button>
                        <button onclick="navegarParaPlanosDoSistema('${sis.id}')" class="flex-1 bg-slate-800 hover:bg-slate-700 text-blue-300 font-bold py-2 px-2 rounded-xl text-xs flex items-center justify-center gap-1 transition-all border border-slate-700" title="Ver Catálogo de Planos deste Sistema">
                            <i class="fa-solid fa-layer-group text-[11px]"></i> Planos (${planosDoSistema.length})
                        </button>
                        ${sis.url ? `
                            <a href="${sis.url}" target="_blank" class="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 px-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition-all border border-slate-700" title="Acessar / Testar Rota">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                        ` : ''}
                        <button onclick="abrirModalNovoSistema('${sis.id}')" title="Editar Detalhes" class="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 px-2.5 rounded-xl text-xs flex items-center justify-center transition-all border border-slate-700">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}
window.renderizarGridSistemasMaster = renderizarGridSistemasMaster;

function abrirModalNovoSistema(sistemaId) {
    const modal = document.getElementById('modal-novo-sistema');
    const elTitulo = document.getElementById('modal-sistema-titulo');
    const inputId = document.getElementById('sistema-form-id');
    const inputNome = document.getElementById('sistema-form-nome');
    const inputSlug = document.getElementById('sistema-form-slug');
    const inputRamo = document.getElementById('sistema-form-ramo');
    const selectIcone = document.getElementById('sistema-form-icone');
    const selectCor = document.getElementById('sistema-form-cor');
    const inputUrl = document.getElementById('sistema-form-url');
    const inputDesc = document.getElementById('sistema-form-desc');
    const chkAtivo = document.getElementById('sistema-form-ativo');

    if (!modal) return;

    if (sistemaId) {
        const sis = listaSistemas.find(s => s.id === sistemaId);
        if (sis) {
            if (elTitulo) elTitulo.innerHTML = `<i class="fa-solid fa-pen text-cyan-400"></i> Editar Sistema "${sis.nome}"`;
            if (inputId) inputId.value = sis.id;
            if (inputNome) inputNome.value = sis.nome;
            if (inputSlug) {
                inputSlug.value = sis.id;
                inputSlug.disabled = true; // Slug não muda na edição
            }
            if (inputRamo) inputRamo.value = sis.ramo || '';
            if (selectIcone) selectIcone.value = sis.icone || 'fa-store';
            if (selectCor) selectCor.value = sis.cor || 'amber';
            if (inputUrl) inputUrl.value = sis.url || '../FC-Gest-o/sistema/';
            if (inputDesc) inputDesc.value = sis.descricao || '';
            if (chkAtivo) chkAtivo.checked = sis.status !== 'INATIVO';
        }
    } else {
        if (elTitulo) elTitulo.innerHTML = '<i class="fa-solid fa-cubes text-cyan-400"></i> Cadastrar Novo Sistema / Software';
        if (inputId) inputId.value = '';
        if (inputNome) inputNome.value = '';
        if (inputSlug) {
            inputSlug.value = '';
            inputSlug.disabled = false;
        }
        if (inputRamo) inputRamo.value = '';
        if (selectIcone) selectIcone.value = 'fa-store';
        if (selectCor) selectCor.value = 'emerald';
        if (inputUrl) inputUrl.value = '../FC-Gest-o/sistema/';
        if (inputDesc) inputDesc.value = '';
        if (chkAtivo) chkAtivo.checked = true;
    }

    modal.classList.remove('hidden');
}
window.abrirModalNovoSistema = abrirModalNovoSistema;

function fecharModalNovoSistema() {
    const modal = document.getElementById('modal-novo-sistema');
    if (modal) modal.classList.add('hidden');
}
window.fecharModalNovoSistema = fecharModalNovoSistema;

async function salvarSistemaMaster(e) {
    if (e) e.preventDefault();

    const inputId = document.getElementById('sistema-form-id');
    const inputNome = document.getElementById('sistema-form-nome');
    const inputSlug = document.getElementById('sistema-form-slug');
    const inputRamo = document.getElementById('sistema-form-ramo');
    const selectIcone = document.getElementById('sistema-form-icone');
    const selectCor = document.getElementById('sistema-form-cor');
    const inputUrl = document.getElementById('sistema-form-url');
    const inputDesc = document.getElementById('sistema-form-desc');
    const chkAtivo = document.getElementById('sistema-form-ativo');
    const btn = document.getElementById('btn-salvar-sistema');

    const isEdit = !!inputId.value;
    let slug = (isEdit ? inputId.value : inputSlug.value).trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (!slug) {
        showToast('Informe o identificador / slug do sistema!', 'error');
        return;
    }

    const nome = inputNome.value.trim();
    const ramo = inputRamo.value.trim();
    const icone = selectIcone.value;
    const cor = selectCor.value;
    const url = inputUrl.value.trim() || '../FC-Gest-o/sistema/';
    const desc = inputDesc.value.trim();
    const status = chkAtivo.checked ? 'ATIVO' : 'INATIVO';

    try {
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gravando Sistema...';
        }

        const dados = {
            id: slug,
            nome: nome,
            ramo: ramo,
            icone: icone,
            cor: cor,
            url: url,
            descricao: desc,
            status: status,
            ultimaAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
        };

        await firebase.firestore().collection('sistemas_saas').doc(slug).set(dados, { merge: true });

        const idx = listaSistemas.findIndex(s => s.id === slug);
        if (idx >= 0) listaSistemas[idx] = { ...dados };
        else listaSistemas.push(dados);

        fecharModalNovoSistema();
        popularSelectsSistemas();
        renderizarGridSistemasMaster();
        renderizarTabelaLojasMaster();
        if (typeof renderizarRelatoriosSaaS === 'function') renderizarRelatoriosSaaS();

        showToast(`Sistema "${nome}" salvo no ecossistema com sucesso!`, 'success');

    } catch (err) {
        console.error("Erro ao salvar sistema:", err);
        showToast('Erro ao salvar sistema: ' + err.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Salvar Sistema';
        }
    }
}
window.salvarSistemaMaster = salvarSistemaMaster;

async function excluirSistemaMaster(sistemaId) {
    if (sistemaId === 'fc_gestao') {
        alert('O sistema FC-Gestão é o produto central nativo da plataforma e não pode ser excluído.');
        return;
    }

    const lojasVinculadas = listaLojas.filter(l => (l.sistemaId || 'fc_gestao') === sistemaId);
    if (lojasVinculadas.length > 0) {
        alert(`Não é possível excluir este sistema pois existem ${lojasVinculadas.length} loja(s) vinculada(s) a ele. Reatribua as lojas para outro sistema no dossiê antes de excluir.`);
        return;
    }

    const sis = listaSistemas.find(s => s.id === sistemaId);
    const nome = sis ? sis.nome : sistemaId;

    if (!confirm(`Tem certeza que deseja excluir permanentemente o produto "${nome}" do ecossistema SaaS?`)) return;

    try {
        await firebase.firestore().collection('sistemas_saas').doc(sistemaId).delete();
        listaSistemas = listaSistemas.filter(s => s.id !== sistemaId);

        popularSelectsSistemas();
        renderizarGridSistemasMaster();
        renderizarTabelaLojasMaster();
        if (typeof renderizarRelatoriosSaaS === 'function') renderizarRelatoriosSaaS();

        showToast(`Sistema "${nome}" excluído com sucesso.`, 'success');
    } catch (err) {
        console.error("Erro ao excluir sistema:", err);
        showToast('Erro ao excluir sistema: ' + err.message, 'error');
    }
}
window.excluirSistemaMaster = excluirSistemaMaster;

function filtrarLojasPorSistema(sistemaId) {
    const selFiltro = document.getElementById('filtro-sistema');
    if (selFiltro) selFiltro.value = sistemaId;
    filtroSistemaAtual = sistemaId;

    navegarMaster('lojas');
    filtrarLojasMaster();
}
window.filtrarLojasPorSistema = filtrarLojasPorSistema;

// ==========================================
// MÓDULO 7: RELATÓRIOS DO SAAS & INTELIGÊNCIA FINANCEIRA
// ==========================================
function renderizarRelatoriosSaaS() {
    const hoje = new Date().toISOString().split('T')[0];

    let mrr = 0;
    let inadimplenciaTotal = 0;
    let inadimplenciaQtd = 0;
    let ativas = 0;
    let emDia = 0;

    listaLojas.forEach(loja => {
        const val = Number(loja.valorMensalidade || 0);
        const venc = loja.dataVencimento || '';
        const status = loja.status || 'ATIVO';

        if (status === 'ATIVO') {
            mrr += val;
            ativas++;

            if (venc && venc < hoje) {
                inadimplenciaTotal += val;
                inadimplenciaQtd++;
            } else {
                emDia++;
            }
        } else if (status === 'PENDENTE') {
            inadimplenciaTotal += val;
            inadimplenciaQtd++;
        }
    });

    const arr = mrr * 12;
    const ticketMedio = ativas > 0 ? (mrr / ativas) : 0;
    const taxaAdimplencia = ativas > 0 ? Math.round((emDia / ativas) * 100) : 100;

    // Atualiza cards de topo
    const elMrr = document.getElementById('rel-mrr-total');
    const elArr = document.getElementById('rel-arr-total');
    const elInadVal = document.getElementById('rel-inadimplencia-total');
    const elInadQtd = document.getElementById('rel-inadimplencia-qtd');
    const elTicket = document.getElementById('rel-ticket-medio');
    const elTaxa = document.getElementById('rel-taxa-adimplencia');
    const elLojasAdimp = document.getElementById('rel-lojas-adimplentes');

    if (elMrr) elMrr.innerText = mrr.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    if (elArr) elArr.innerText = arr.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    if (elInadVal) elInadVal.innerText = inadimplenciaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    if (elInadQtd) elInadQtd.innerText = `${inadimplenciaQtd} loja(s) com atraso`;
    if (elTicket) elTicket.innerText = ticketMedio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    if (elTaxa) elTaxa.innerText = `${taxaAdimplencia}%`;
    if (elLojasAdimp) elLojasAdimp.innerText = `${emDia} de ${ativas} em dia`;

    // 1. Distribuição por Sistema
    const contSistemas = document.getElementById('rel-lista-por-sistema');
    const countBadgeSistemas = document.getElementById('rel-total-sistemas-count');
    if (contSistemas) {
        if (countBadgeSistemas) countBadgeSistemas.innerText = `${listaSistemas.length} Sistemas`;

        contSistemas.innerHTML = listaSistemas.map(sis => {
            const lojasDoSis = listaLojas.filter(l => (l.sistemaId || 'fc_gestao') === sis.id);
            const mrrSis = lojasDoSis.reduce((acc, l) => acc + Number(l.valorMensalidade || 0), 0);
            const pct = mrr > 0 ? Math.round((mrrSis / mrr) * 100) : 0;
            const mrrSisFmt = mrrSis.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            return `
                <div class="space-y-1.5 p-2 rounded-xl hover:bg-slate-900/60 transition-colors">
                    <div class="flex items-center justify-between text-xs">
                        <span class="font-extrabold text-white flex items-center gap-1.5">
                            <i class="fa-solid ${sis.icone || 'fa-cubes'} text-[11px] text-cyan-400"></i> ${sis.nome}
                        </span>
                        <span class="font-black text-emerald-400">${mrrSisFmt} <span class="text-slate-400 font-medium font-mono text-[10px]">(${pct}%)</span></span>
                    </div>
                    <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div class="bg-cyan-500 h-full rounded-full transition-all duration-500" style="width: ${pct}%"></div>
                    </div>
                    <div class="flex items-center justify-between text-[10px] text-slate-400">
                        <span>${lojasDoSis.length} empresa(s) vinculada(s)</span>
                        <span>${sis.ramo}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 2. Distribuição por Plano
    const contPlanos = document.getElementById('rel-lista-por-plano');
    const countBadgePlanos = document.getElementById('rel-total-planos-count');
    if (contPlanos) {
        if (countBadgePlanos) countBadgePlanos.innerText = `${listaPlanos.length} Planos`;

        contPlanos.innerHTML = listaPlanos.map(plano => {
            const sisId = plano.sistemaId || 'fc_gestao';
            const sis = listaSistemas.find(s => s.id === sisId);
            const nomeSis = sis ? sis.nome : (sisId === 'fc_gestao' ? 'FC-Gestão' : sisId);
            const lojasDoPlano = listaLojas.filter(l => l.plano === plano.id || l.plano === 'plano_' + String(plano.id).toLowerCase());
            const mrrPlano = lojasDoPlano.reduce((acc, l) => acc + Number(l.valorMensalidade || 0), 0);
            const pct = mrr > 0 ? Math.round((mrrPlano / mrr) * 100) : 0;
            const mrrPlanoFmt = mrrPlano.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            return `
                <div class="space-y-1.5 p-2 rounded-xl hover:bg-slate-900/60 transition-colors">
                    <div class="flex items-center justify-between text-xs">
                        <span class="font-extrabold text-white flex items-center gap-1.5">
                            <i class="fa-solid fa-layer-group text-[11px] text-blue-400"></i> ${plano.nome}
                            <span class="text-[9px] px-1.5 py-0.5 rounded font-bold text-slate-400 bg-slate-800 border border-slate-700/60">${nomeSis}</span>
                        </span>
                        <span class="font-black text-emerald-400">${mrrPlanoFmt} <span class="text-slate-400 font-medium font-mono text-[10px]">(${pct}%)</span></span>
                    </div>
                    <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div class="bg-blue-500 h-full rounded-full transition-all duration-500" style="width: ${pct}%"></div>
                    </div>
                    <div class="flex items-center justify-between text-[10px] text-slate-400">
                        <span>${lojasDoPlano.length} loja(s) contratante(s)</span>
                        <span>Preço base: R$ ${Number(plano.preco || 0).toFixed(2)}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderizarTabelaVencimentosRelatorio();
}
window.renderizarRelatoriosSaaS = renderizarRelatoriosSaaS;

function renderizarTabelaVencimentosRelatorio() {
    const corpo = document.getElementById('rel-tabela-vencimentos-corpo');
    const selectFiltro = document.getElementById('filtro-vencimentos-rel');
    if (!corpo) return;

    const filtro = selectFiltro ? selectFiltro.value : 'atrasados';
    const hoje = new Date().toISOString().split('T')[0];

    const lojasFiltradas = listaLojas.filter(loja => {
        const venc = loja.dataVencimento;
        if (!venc) return false;

        const d1 = new Date(hoje);
        const d2 = new Date(venc);
        const diffDias = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));

        if (filtro === 'atrasados') return diffDias < 0;
        if (filtro === '7dias') return diffDias >= 0 && diffDias <= 7;
        if (filtro === '15dias') return diffDias >= 0 && diffDias <= 15;
        if (filtro === '30dias') return diffDias >= 0 && diffDias <= 30;
        return true; // 'todos'
    });

    // Ordena pelo vencimento mais urgente (crescente)
    lojasFiltradas.sort((a, b) => (a.dataVencimento || '').localeCompare(b.dataVencimento || ''));

    if (lojasFiltradas.length === 0) {
        corpo.innerHTML = `
            <tr>
                <td colspan="6" class="py-10 text-center text-slate-500">
                    <i class="fa-solid fa-circle-check text-2xl mb-1 text-emerald-400"></i>
                    <p class="font-bold text-white">Nenhum vencimento pendente para este período!</p>
                    <p class="text-[10px] text-slate-500 mt-0.5">Todas as cobranças do período selecionado estão em dia.</p>
                </td>
            </tr>
        `;
        return;
    }

    corpo.innerHTML = lojasFiltradas.map(loja => {
        const nome = loja.nomeEmpresa || loja.nome || 'Loja';
        const valor = Number(loja.valorMensalidade || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const venc = loja.dataVencimento || '';
        const status = loja.status || 'ATIVO';

        const sistemaId = loja.sistemaId || 'fc_gestao';
        const sisObj = listaSistemas.find(s => s.id === sistemaId) || SISTEMAS_PADRAO.find(s => s.id === sistemaId) || { nome: 'FC-Gestão', cor: 'amber' };

        const d1 = new Date(hoje);
        const d2 = new Date(venc);
        const diffDias = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));

        let badgeDias = '';
        if (diffDias < 0) {
            badgeDias = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">Vencido (${Math.abs(diffDias)}d atrás)</span>`;
        } else if (diffDias === 0) {
            badgeDias = `<span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">Vence HOJE!</span>`;
        } else if (diffDias <= 5) {
            badgeDias = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Vence em ${diffDias}d</span>`;
        } else {
            badgeDias = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Em ${diffDias}d</span>`;
        }

        return `
            <tr class="hover:bg-slate-800/40 transition-colors">
                <td class="py-3 px-3.5">
                    <div class="font-bold text-white">${nome}</div>
                    <div class="text-[10px] text-slate-500 font-mono">${loja.whatsapp || loja.emailAcesso || 'Sem contato'}</div>
                </td>
                <td class="py-3 px-3.5">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">${sisObj.nome}</span>
                </td>
                <td class="py-3 px-3.5 font-black text-emerald-400">${valor}</td>
                <td class="py-3 px-3.5 font-mono text-slate-200">${formatarDataBr(venc)}</td>
                <td class="py-3 px-3.5">${badgeDias}</td>
                <td class="py-3 px-3.5 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                        <button onclick="enviarCobrancaWhatsAppMaster('${loja.id}')" title="Enviar Cobrança WhatsApp" class="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                            <i class="fa-brands fa-whatsapp"></i> Cobrar
                        </button>
                        <button onclick="abrirDossieEmpresa('${loja.id}'); setTimeout(() => trocarAbaDossie('faturas'), 150);" title="Registrar Recebimento" class="bg-amber-500 hover:bg-amber-600 text-slate-950 px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1 shadow-sm">
                            <i class="fa-solid fa-check"></i> Receber
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}
window.renderizarTabelaVencimentosRelatorio = renderizarTabelaVencimentosRelatorio;

// Exportar base completa de lojas e mensalidades para Excel / CSV (compatível nativamente com Microsoft Excel)
function exportarLojasExcel() {
    if (listaLojas.length === 0) {
        showToast('Nenhuma loja cadastrada para exportar!', 'info');
        return;
    }

    const hoje = new Date().toISOString().split('T')[0];
    const cabecalho = [
        'ID Empresa',
        'Nome / Razão Social',
        'CNPJ / CPF',
        'Sistema',
        'Responsável',
        'E-mail Login',
        'WhatsApp',
        'Plano',
        'Valor Mensalidade (R$)',
        'Data Vencimento',
        'Status do Acesso',
        'Anotações CRM'
    ];

    const linhas = listaLojas.map(loja => {
        const sis = listaSistemas.find(s => s.id === (loja.sistemaId || 'fc_gestao'))?.nome || 'FC-Gestão';
        const dono = loja.donoInfo?.nome || 'Admin';
        const email = loja.emailAcesso || loja.donoInfo?.email || '';
        const wpp = loja.whatsapp || '';
        const crm = (loja.crmNotas || '').replace(/[\r\n]+/g, ' ');

        return [
            loja.id,
            loja.nomeEmpresa || loja.nome || '',
            loja.configEmpresa?.cnpj || loja.cnpj || '',
            sis,
            dono,
            email,
            wpp,
            loja.plano || 'PRO',
            Number(loja.valorMensalidade || 0).toFixed(2).replace('.', ','),
            formatarDataBr(loja.dataVencimento),
            loja.status || 'ATIVO',
            crm
        ].map(campo => `"${String(campo).replace(/"/g, '""')}"`).join(';');
    });

    const conteudoCsv = '\uFEFF' + [cabecalho.join(';'), ...linhas].join('\r\n');
    const blob = new Blob([conteudoCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `relatorio_clientes_saas_${hoje}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Planilha Excel (.CSV) exportada com sucesso!', 'success');
}
window.exportarLojasExcel = exportarLojasExcel;

// Exportar Relatório Executivo do SaaS em formato PDF
function exportarRelatorioSaaSPDF() {
    const container = document.getElementById('area-impressao-relatorio');
    if (!container) return;

    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    const horaFormatada = hoje.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    let mrr = 0;
    let atrasadas = 0;
    let ativas = 0;

    listaLojas.forEach(l => {
        const val = Number(l.valorMensalidade || 0);
        if (l.status === 'ATIVO') {
            mrr += val;
            ativas++;
            if (l.dataVencimento && l.dataVencimento < hoje.toISOString().split('T')[0]) atrasadas++;
        }
    });

    const arr = mrr * 12;

    container.className = "bg-white text-slate-900 p-8 rounded-xl space-y-6 text-xs";
    container.innerHTML = `
        <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
                <h1 style="font-size: 18pt; font-weight: 900; color: #0f172a; margin: 0;">RELATÓRIO EXECUTIVO DO SAAS</h1>
                <p style="font-size: 10pt; color: #475569; margin: 2px 0 0 0;">Painel de Inteligência Financeira e Clientes - Fundador</p>
            </div>
            <div style="text-align: right; font-size: 9pt; color: #64748b;">
                <p style="margin: 0;"><strong>Emissão:</strong> ${dataFormatada} às ${horaFormatada}</p>
                <p style="margin: 2px 0 0 0;"><strong>Fundador:</strong> Paulo Augusto</p>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 16px 0;">
            <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; background: #f8fafc;">
                <span style="font-size: 8pt; color: #64748b; font-weight: bold; text-transform: uppercase;">Receita Mensal (MRR)</span>
                <div style="font-size: 14pt; font-weight: 900; color: #0f172a; margin-top: 4px;">${mrr.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            </div>
            <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; background: #f8fafc;">
                <span style="font-size: 8pt; color: #64748b; font-weight: bold; text-transform: uppercase;">Projeção Anual (ARR)</span>
                <div style="font-size: 14pt; font-weight: 900; color: #15803d; margin-top: 4px;">${arr.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            </div>
            <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; background: #f8fafc;">
                <span style="font-size: 8pt; color: #64748b; font-weight: bold; text-transform: uppercase;">Total de Empresas</span>
                <div style="font-size: 14pt; font-weight: 900; color: #0f172a; margin-top: 4px;">${listaLojas.length} (${ativas} ativas)</div>
            </div>
            <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; background: #f8fafc;">
                <span style="font-size: 8pt; color: #64748b; font-weight: bold; text-transform: uppercase;">Inadimplência</span>
                <div style="font-size: 14pt; font-weight: 900; color: #b91c1c; margin-top: 4px;">${atrasadas} loja(s)</div>
            </div>
        </div>

        <div>
            <h3 style="font-size: 11pt; font-weight: bold; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 8px;">Listagem Consolidada de Clientes e Assinaturas</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 9pt;">
                <thead>
                    <tr style="background: #f1f5f9; text-align: left; border-bottom: 2px solid #cbd5e1;">
                        <th style="padding: 6px 8px;">Empresa</th>
                        <th style="padding: 6px 8px;">Sistema</th>
                        <th style="padding: 6px 8px;">Dono / WhatsApp</th>
                        <th style="padding: 6px 8px;">Plano</th>
                        <th style="padding: 6px 8px;">Mensalidade</th>
                        <th style="padding: 6px 8px;">Vencimento</th>
                        <th style="padding: 6px 8px; text-align: center;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${listaLojas.map(loja => {
                        const sis = listaSistemas.find(s => s.id === (loja.sistemaId || 'fc_gestao'))?.nome || 'FC-Gestão';
                        const val = Number(loja.valorMensalidade || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                        return `
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 6px 8px; font-weight: bold;">${loja.nomeEmpresa || loja.nome}</td>
                                <td style="padding: 6px 8px;">${sis}</td>
                                <td style="padding: 6px 8px;">${loja.donoInfo?.nome || 'Admin'} (${loja.whatsapp || '-'})</td>
                                <td style="padding: 6px 8px;">${loja.plano || 'PRO'}</td>
                                <td style="padding: 6px 8px; font-weight: bold;">${val}</td>
                                <td style="padding: 6px 8px;">${formatarDataBr(loja.dataVencimento)}</td>
                                <td style="padding: 6px 8px; text-align: center;">${loja.status || 'ATIVO'}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>

        <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #cbd5e1; font-size: 8pt; color: #64748b; text-align: center;">
            Documento de controle gerencial confidencial - SaaS Multi-Tenant Manager
        </div>
    `;

    container.classList.remove('hidden');
    window.print();
    setTimeout(() => { container.classList.add('hidden'); }, 1000);
}
window.exportarRelatorioSaaSPDF = exportarRelatorioSaaSPDF;

// ==========================================
// PWA & INSTALAÇÃO DO SAAS MASTER (DESKTOP E MOBILE)
// ==========================================
let deferredPwaPrompt = null;

if ('serviceWorker' in navigator && (window.location.protocol === 'http:' || window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('👑 PWA SaaS Master: Service Worker ativo!'))
            .catch(err => console.warn('PWA Service Worker offline/ignorado:', err));
    });
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPwaPrompt = e;
    window.deferredPwaPrompt = e;
    console.log('📲 PWA SaaS Master: Evento de instalação pronto.');
    mostrarBotoesInstalarMaster();
});

window.addEventListener('appinstalled', () => {
    deferredPwaPrompt = null;
    window.deferredPwaPrompt = null;
    console.log('🎉 PWA SaaS Master instalado com sucesso!');
    const btnSidebar = document.getElementById('btn-instalar-pwa-master');
    if (btnSidebar) btnSidebar.remove();
    const loginPwa = document.getElementById('login-pwa-container');
    if (loginPwa) loginPwa.classList.add('hidden');
    if (typeof showToast === 'function') {
        showToast('Aplicativo SaaS Master instalado com sucesso no seu dispositivo!', 'success');
    }
});

function mostrarBotoesInstalarMaster() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isStandalone) {
        const btnSidebar = document.getElementById('btn-instalar-pwa-master');
        if (btnSidebar) btnSidebar.remove();
        const loginPwa = document.getElementById('login-pwa-container');
        if (loginPwa) loginPwa.classList.add('hidden');
        return;
    }

    // 1. Botão no Painel Principal (Sidebar - Acima do botão Desconectar)
    const sidebarContainer = document.getElementById('sidebar-footer-container');
    if (sidebarContainer && !document.getElementById('btn-instalar-pwa-master')) {
        const btn = document.createElement('button');
        btn.id = 'btn-instalar-pwa-master';
        btn.type = 'button';
        btn.className = 'w-full mb-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold py-2.5 px-3 rounded-lg shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] cursor-pointer';
        btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down text-sm"></i> Instalar Aplicativo';
        btn.onclick = window.instalarPWAMaster;
        sidebarContainer.insertBefore(btn, sidebarContainer.firstChild);
    }

    // 2. Botão na Tela de Login
    const loginPwaContainer = document.getElementById('login-pwa-container');
    if (loginPwaContainer) {
        loginPwaContainer.classList.remove('hidden');
    }
}

async function instalarPWAMaster() {
    if (deferredPwaPrompt) {
        try {
            deferredPwaPrompt.prompt();
            const choice = await deferredPwaPrompt.userChoice;
            if (choice && choice.outcome === 'accepted') {
                console.log('Usuário aceitou instalar o SaaS Master');
                const btnSidebar = document.getElementById('btn-instalar-pwa-master');
                if (btnSidebar) btnSidebar.remove();
                const loginPwa = document.getElementById('login-pwa-container');
                if (loginPwa) loginPwa.classList.add('hidden');
            }
            deferredPwaPrompt = null;
        } catch(err) {
            console.error('Erro ao solicitar instalação:', err);
        }
    } else {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) {
            alert('📱 Como instalar no iPhone / iPad:\n\n1. Toque no botão "Compartilhar" (ícone com quadrado e seta para cima na barra do Safari).\n2. Role para baixo e toque em "Adicionar à Tela de Início".\n3. Toque em "Adicionar" no topo direito.');
        } else {
            alert('📱 Como instalar no Computador ou Android:\n\n1. No Google Chrome ou Microsoft Edge, clique no ícone "Instalar Aplicativo" na barra de endereços (ao lado da estrela de favoritos).\n2. Ou clique nos 3 pontinhos do navegador e escolha "Instalar SaaS Master" ou "Salvar e Compartilhar" > "Instalar como aplicativo".');
        }
    }
}
window.instalarPWAMaster = instalarPWAMaster;
window.mostrarBotoesInstalarMaster = mostrarBotoesInstalarMaster;

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(mostrarBotoesInstalarMaster, 600);
});

window.addEventListener('load', () => {
    setTimeout(mostrarBotoesInstalarMaster, 1200);
});

