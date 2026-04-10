// ===== DADOS DO COTADOR =====

const APP_DATA = {
    vendedores: {
        'NAYHARA SOARES': { telefone: '(18) 99622-3163', email: 'nayhara@oestesaude.com.br' },
        'LUANA ESQUIVEL': { telefone: '(18) 99603-7238', email: 'luana@oestesaude.com.br' },
        'AMANDA SANTOS': { telefone: '(18) 99813-8434', email: 'amanda@oestesaude.com.br' },
        'SABRINA SOUZA': { telefone: '(18) 99647-7073', email: 'sabrina@oestesaude.com.br' },
        'TALITA PIRES': { telefone: '(18) 3918-5100', email: 'talita@oestesaude.com.br' },
        'LAURA TIEZZI': { telefone: '(18) 99692-4079', email: 'laura@oestesaude.com.br' },
        'WALLACE VICTOR': { telefone: '(67) 9664-7468', email: 'wallace.alonso@oestesaude.com.br' },
        'VITOR MACARINI': { telefone: '(18) 99722-3454', email: 'vitor.macarini@oestesaude.com.br' },
        'VICTOR VALÉRIO': { telefone: '(18) 99811-6070', email: 'comercialconecse@gmail.com' },
        'GABRIEL ESPOLADOR': { telefone: '(18) 99811-6070', email: 'comercialconecse@gmail.com' },
        'VINICIUS VIEIRA': { telefone: '(18) 99629-9946', email: 'vinicius.vieira@oestesaude.com.br' },
        'GUILHERME TURMAN': { telefone: '(18) 99672-3084', email: 'guilherme.turman@oestesaude.com.br' },
        'NATALIA PIRES': { telefone: '(18) 99600-2915', email: 'natalia.pires@oestesaude.com.br' }
    },
    faixas: {
        1: { nome: '0-18 anos', chave: 'f1' },
        2: { nome: '19-23 anos', chave: 'f2' },
        3: { nome: '24-28 anos', chave: 'f3' },
        4: { nome: '29-33 anos', chave: 'f4' },
        5: { nome: '34-38 anos', chave: 'f5' },
        6: { nome: '39-43 anos', chave: 'f6' },
        7: { nome: '44-48 anos', chave: 'f7' },
        8: { nome: '49-53 anos', chave: 'f8' },
        9: { nome: '54-58 anos', chave: 'f9' },
        10: { nome: '59+ anos', chave: 'f10' }
    },
    regioes: {
        "Oeste Paulista (SP)": {
            tipos: {
                "Empresarial (até 29 vidas)": ["Premium I (20%)", "Premium II (30%)", "Premium III (40%)", "Premium IV (50%)", "Premium Ouro I (20%)", "Exclusivo III Empresarial até 29 vidas (40%)"],
                "Empresarial (30 vidas ou +)": ["Premium I (20%)", "Premium II (30%)", "Premium III (40%)", "Premium IV (50%)", "Premium Ouro I (20%)", "Exclusivo III Empresarial 30 vidas ou + (40%)"],
                "Tabela Referência": ["Premium III (40%)"]
            },
            tipoColor: 'premium',
            requerTaxa: false,
            imagens: {
                "Individual": {
                    "Premium e Exclusivo (IV, III ,II e I)": "https://i.imgur.com/FBUtb4t.jpeg",
                    "Premium e Exclusivo (IV, III e II)": "https://i.imgur.com/U53xCQC.jpeg",
                    "Premium e Exclusivo (IV, III e I)": "https://i.imgur.com/9YcwqpP.jpeg",
                    "Premium e Exclusivo (IV e III)": "https://i.imgur.com/w68aUex.jpeg",
                    "Premium e Exclusivo (IV, II e I)": "https://i.imgur.com/M778mK5.jpeg",
                    "Premium e Exclusivo (IV e II)": "https://i.imgur.com/LS7RHpV.jpeg",
                    "Premium e Exclusivo (IV e I)": "https://i.imgur.com/bVhgBaq.jpeg",
                    "Premium e Exclusivo (IV)": "https://i.imgur.com/26h9URw.jpeg",
                    "Premium e Exclusivo (III, II e I)": "https://i.imgur.com/kxvLAHW.jpeg",
                    "Premium e Exclusivo (III e II)": "https://imgur.com/5PWqFwS.jpeg",
                    "Premium e Exclusivo (III e I)": "https://i.imgur.com/b1Jv19k.jpeg",
                    "Premium e Exclusivo (III)": "https://i.imgur.com/3oD2bOy.jpeg",
                    "Premium e Exclusivo (II e I)": "https://i.imgur.com/okDFPHF.jpeg",
                    "Premium e Exclusivo (II)": "https://i.imgur.com/tOZDb56.jpeg",
                    "Premium e Exclusivo (I)": "https://i.imgur.com/1crdDYz.jpeg",
                    "Exclusivo (III)": "https://i.imgur.com/Bs14AJ6.jpeg",
                    "Premium (IV, III, II e I)": "https://i.imgur.com/GKRjVCW.jpeg",
                    "Premium (IV, III e II)": "https://i.imgur.com/U53xCQC.jpeg",
                    "Premium (IV e III)": "https://i.imgur.com/XSOknGQ.jpeg",
                    "Premium (IV,II e I)": "https://i.imgur.com/fNmdzB7.jpeg",
                    "Premium (IV, III e I)": "https://i.imgur.com/9YcwqpP.jpeg",
                    "Premium (IV e II)": "https://i.imgur.com/lbggC8V.jpeg",
                    "Premium (IV e I)": "https://i.imgur.com/ITO3uBu.jpeg",
                    "Premium (IV)": "https://i.imgur.com/26h9URw.jpeg",
                    "Premium (III, II e I)": "https://i.imgur.com/ERsl0dB.jpeg",
                    "Premium (III e II)": "https://i.imgur.com/w4cBF2i.jpeg",
                    "Premium (III e I)": "https://i.imgur.com/3eBclVW.jpeg",
                    "Premium (III)": "https://i.imgur.com/yw0T4MU.jpeg",
                    "Premium (II e I)": "https://i.imgur.com/sE6p3Vm.jpeg",
                    "Premium (II)": "https://i.imgur.com/Tssei95.jpeg",
                    "Premium (I)": "https://i.imgur.com/EzejAZa.jpeg"
                },
                "Familiar": {
                    "Premium e Exclusivo (IV, III, II e I)": "https://i.imgur.com/FBUtb4t.jpeg",
                    "Premium e Exclusivo (IV, III e II)": "https://i.imgur.com/phUm2xJ.jpeg",
                    "Premium e Exclusivo (IV, III e I)": "https://i.imgur.com/9YcwqpP.jpeg",
                    "Premium e Exclusivo (IV e III)": "https://i.imgur.com/w68aUex.jpeg",
                    "Premium e Exclusivo (IV, II e I)": "https://i.imgur.com/M778mK5.jpeg",
                    "Premium e Exclusivo (IV e II)": "https://i.imgur.com/LS7RHpV.jpeg",
                    "Premium e Exclusivo (IV e I)": "https://i.imgur.com/bVhgBaq.jpeg",
                    "Premium e Exclusivo (IV)": "https://i.imgur.com/26h9URw.jpeg",
                    "Premium e Exclusivo (III, II e I)": "https://i.imgur.com/kxvLAHW.jpeg",
                    "Premium e Exclusivo (III e II)": "https://imgur.com/5PWqFwS.jpeg",
                    "Premium e Exclusivo (III e I)": "https://i.imgur.com/5rryj1G.jpeg",
                    "Premium e Exclusivo (III)": "https://i.imgur.com/3oD2bOy.jpeg",
                    "Premium e Exclusivo (II e I)": "https://i.imgur.com/okDFPHF.jpeg",
                    "Premium e Exclusivo (II)": "https://i.imgur.com/tOZDb56.jpeg",
                    "Premium e Exclusivo (I)": "https://i.imgur.com/1crdDYz.jpeg",
                    "Exclusivo (III)": "https://i.imgur.com/Bs14AJ6.jpeg",
                    "Premium (IV, III, II e I)": "https://i.imgur.com/GKRjVCW.jpeg",
                    "Premium (IV, III e II)": "https://i.imgur.com/U53xCQC.jpeg",
                    "Premium (IV e III)": "https://i.imgur.com/XSOknGQ.jpeg",
                    "Premium (IV, II e I)": "https://i.imgur.com/fNmdzB7.jpeg",
                    "Premium (IV, III e I)": "https://i.imgur.com/wvafR6k.jpeg",
                    "Premium (IV e II)": "https://i.imgur.com/lbggC8V.jpeg",
                    "Premium (IV e I)": "https://i.imgur.com/ITO3uBu.jpeg",
                    "Premium (IV)": "https://i.imgur.com/26h9URw.jpeg",
                    "Premium (III, II e I)": "https://i.imgur.com/ERsl0dB.jpeg",
                    "Premium (III e II)": "https://i.imgur.com/w4cBF2i.jpeg",
                    "Premium (III e I)": "https://i.imgur.com/3eBclVW.jpeg",
                    "Premium (III)": "https://i.imgur.com/yw0T4MU.jpeg",
                    "Premium (II e I)": "https://i.imgur.com/sE6p3Vm.jpeg",
                    "Premium (II)": "https://i.imgur.com/Tssei95.jpeg",
                    "Premium (I)": "https://i.imgur.com/EzejAZa.jpeg"
                },
                "Empresarial (até 29 vidas)": {
                    "Premium e Exclusivo (IV, III, II e I)": "https://i.imgur.com/FBUtb4t.jpeg",
                    "Premium e Exclusivo (IV, III e II)": "https://i.imgur.com/U53xCQC.jpeg",
                    "Premium e Exclusivo (IV, III e I)": "https://i.imgur.com/VIoWsQo.jpeg",
                    "Premium e Exclusivo (IV e III)": "https://i.imgur.com/w68aUex.jpeg",
                    "Premium e Exclusivo (IV, II e I)": "https://i.imgur.com/M778mK5.jpeg",
                    "Premium e Exclusivo (IV e II)": "https://i.imgur.com/LS7RHpV.jpeg",
                    "Premium e Exclusivo (IV e I)": "https://i.imgur.com/bVhgBaq.jpeg",
                    "Premium e Exclusivo (IV)": "https://i.imgur.com/26h9URw.jpeg",
                    "Premium e Exclusivo (III, II e I)": "https://i.imgur.com/kxvLAHW.jpeg",
                    "Premium e Exclusivo (III e II)": "https://imgur.com/5PWqFwS.jpeg",
                    "Premium e Exclusivo (III e I)": "https://i.imgur.com/5rryj1G.jpeg",
                    "Premium e Exclusivo (III)": "https://i.imgur.com/3oD2bOy.jpeg",
                    "Premium e Exclusivo (II e I)": "https://i.imgur.com/okDFPHF.jpeg",
                    "Premium e Exclusivo (II)": "https://i.imgur.com/tOZDb56.jpeg",
                    "Premium e Exclusivo (I)": "https://i.imgur.com/1crdDYz.jpeg",
                    "Exclusivo (III)": "https://i.imgur.com/Bs14AJ6.jpeg",
                    "Premium (IV, III, II e I)": "https://i.imgur.com/GKRjVCW.jpeg",
                    "Premium (IV, III e II)": "https://i.imgur.com/U53xCQC.jpeg",
                    "Premium (IV e III)": "https://i.imgur.com/XSOknGQ.jpeg",
                    "Premium (IV, II e I)": "https://i.imgur.com/fNmdzB7.jpeg",
                    "Premium (IV, III e I)": "https://i.imgur.com/9YcwqpP.jpeg",
                    "Premium (IV e II)": "https://i.imgur.com/lbggC8V.jpeg",
                    "Premium (IV e I)": "https://i.imgur.com/ITO3uBu.jpeg",
                    "Premium (IV)": "https://i.imgur.com/26h9URw.jpeg",
                    "Premium (III, II e I)": "https://i.imgur.com/ERsl0dB.jpeg",
                    "Premium (III e II)": "https://i.imgur.com/w4cBF2i.jpeg",
                    "Premium (III e I)": "https://i.imgur.com/3eBclVW.jpeg",
                    "Premium (III)": "https://i.imgur.com/yw0T4MU.jpeg",
                    "Premium (II e I)": "https://i.imgur.com/sE6p3Vm.jpeg",
                    "Premium (II)": "https://i.imgur.com/Tssei95.jpeg",
                    "Premium (I)": "https://i.imgur.com/EzejAZa.jpeg"
                },
                "Empresarial (30 vidas ou +)": {
                    "Premium e Exclusivo (IV, III, II e I)": "https://i.imgur.com/FBUtb4t.jpeg",
                    "Premium e Exclusivo (IV, III e II)": "https://i.imgur.com/U53xCQC.jpeg",
                    "Premium e Exclusivo (IV, III e I)": "https://i.imgur.com/VIoWsQo.jpeg",
                    "Premium e Exclusivo (IV e III)": "https://i.imgur.com/XSOknGQ.jpeg",
                    "Premium e Exclusivo (IV,II e I)": "https://i.imgur.com/M778mK5.jpeg",
                    "Premium e Exclusivo (IV e II)": "https://i.imgur.com/LS7RHpV.jpeg",
                    "Premium e Exclusivo (IV e I)": "https://i.imgur.com/bVhgBaq.jpeg",
                    "Premium e Exclusivo (IV)": "https://i.imgur.com/26h9URw.jpeg",
                    "Premium e Exclusivo (III,II e I)": "https://i.imgur.com/kxvLAHW.jpeg",
                    "Premium e Exclusivo (III e II)": "https://imgur.com/5PWqFwS.jpeg",
                    "Premium e Exclusivo (III e I)": "https://i.imgur.com/5rryj1G.jpeg",
                    "Premium e Exclusivo (III)": "https://i.imgur.com/3oD2bOy.jpeg",
                    "Premium e Exclusivo (II e I)": "https://i.imgur.com/okDFPHF.jpeg",
                    "Premium e Exclusivo (II)": "https://i.imgur.com/tOZDb56.jpeg",
                    "Premium e Exclusivo (I)": "https://i.imgur.com/1crdDYz.jpeg",
                    "Exclusivo (III)": "https://i.imgur.com/Bs14AJ6.jpeg",
                    "Premium (IV, III, II e I)": "https://i.imgur.com/GKRjVCW.jpeg",
                    "Premium (IV, III e II)": "https://i.imgur.com/U53xCQC.jpeg",
                    "Premium (IV e III)": "https://i.imgur.com/XSOknGQ.jpeg",
                    "Premium (IV, II e I)": "https://i.imgur.com/fNmdzB7.jpeg",
                    "Premium (IV, III e I)": "https://i.imgur.com/wvafR6k.jpeg",
                    "Premium (IV e II)": "https://i.imgur.com/lbggC8V.jpeg",
                    "Premium (IV e I)": "https://i.imgur.com/ITO3uBu.jpeg",
                    "Premium (IV)": "https://i.imgur.com/26h9URw.jpeg",
                    "Premium (III, II e I)": "https://i.imgur.com/ERsl0dB.jpeg",
                    "Premium (III e II)": "https://i.imgur.com/w4cBF2i.jpeg",
                    "Premium (III e I)": "https://i.imgur.com/3eBclVW.jpeg",
                    "Premium (III)": "https://i.imgur.com/yw0T4MU.jpeg",
                    "Premium (II e I)": "https://i.imgur.com/sE6p3Vm.jpeg",
                    "Premium (II)": "https://i.imgur.com/Tssei95.jpeg",
                    "Premium (I)": "https://i.imgur.com/EzejAZa.jpeg"
                },
                "Tabela Referência": {
                    "Premium (III)": "https://i.imgur.com/26h9URw.jpeg"
                }
            }
        },
        "Campo Grande (MS)": {
            tipos: {
                "Empresarial (até 29 vidas)": ["Premium II (30%)", "Premium III (40%)", "Premium IV (50%)", "Premium Ouro III (40%)"],
                "Empresarial (30 vidas ou +)": ["Premium II (30%)", "Premium III (40%)", "Premium IV (50%)", "Premium Ouro III (40%)"]
            },
            tipoColor: 'premium',
            requerTaxa: false,
            imagens: {
                "Empresarial (até 29 vidas)": {
                    "Premium (IV, III e II)": "https://i.imgur.com/fEmYbIR.jpeg",
                    "Premium (IV e III)": "https://i.imgur.com/OD5dBdD.jpeg",
                    "Premium (IV e II)": "https://i.imgur.com/q3rDnTj.jpeg",
                    "Premium (IV)": "https://i.imgur.com/GPvpo3y.jpeg",
                    "Premium (III e II)": "https://i.imgur.com/RufpIlo.jpeg",
                    "Premium (III)": "https://i.imgur.com/SmAnZfD.jpeg",
                    "Premium (II)": "https://i.imgur.com/ejJs07X.jpeg"
                },
                "Empresarial (30 vidas ou +)": {
                    "Premium (IV, III e II)": "https://i.imgur.com/fEmYbIR.jpeg",
                    "Premium (IV e III)": "https://i.imgur.com/OD5dBdD.jpeg",
                    "Premium (IV e II)": "https://i.imgur.com/q3rDnTj.jpeg",
                    "Premium (IV)": "https://i.imgur.com/GPvpo3y.jpeg",
                    "Premium (III e II)": "https://i.imgur.com/RufpIlo.jpeg",
                    "Premium (III)": "https://i.imgur.com/SmAnZfD.jpeg",
                    "Premium (II)": "https://i.imgur.com/ejJs07X.jpeg"
                }
            }
        },
        "Dourados (MS)": {
            tipos: {
                "Empresarial (até 29 vidas)": ["Premium II (30%)", "Premium III (40%)", "Premium IV (50%)", "Premium Ouro III (40%)"],
                "Empresarial (30 vidas ou +)": ["Premium II (30%)", "Premium III (40%)", "Premium IV (50%)", "Premium Ouro III (40%)"]
            },
            tipoColor: 'premium',
            requerTaxa: false,
            imagens: {
                "Empresarial (até 29 vidas)": {
                    "Premium (IV, III e II)": "https://i.imgur.com/izSCEBp.jpeg",
                    "Premium (IV e III)": "https://i.imgur.com/bfPokcV.jpeg",
                    "Premium (IV e II)": "https://i.imgur.com/MxPPND8.jpeg",
                    "Premium (IV)": "https://i.imgur.com/ZzV42go.jpeg",
                    "Premium (III e II)": "https://i.imgur.com/9pCwVqm.jpeg",
                    "Premium (III)": "https://i.imgur.com/bZR2lj9.jpeg",
                    "Premium (II)": "https://i.imgur.com/U00y6r5.jpeg"
                },
                "Empresarial (30 vidas ou +)": {
                    "Premium (IV, III e II)": "https://i.imgur.com/izSCEBp.jpeg",
                    "Premium (IV e III)": "https://i.imgur.com/bfPokcV.jpeg",
                    "Premium (IV e II)": "https://i.imgur.com/MxPPND8.jpeg",
                    "Premium (IV)": "https://i.imgur.com/ZzV42go.jpeg",
                    "Premium (III e II)": "https://i.imgur.com/9pCwVqm.jpeg",
                    "Premium (III)": "https://i.imgur.com/bZR2lj9.jpeg",
                    "Premium (II)": "https://i.imgur.com/U00y6r5.jpeg"
                }
            }
        },
        "Corpe (SP)": {
            tipos: {
                "Coletivo por Adesão": ["Premium I (20%)", "Premium II (30%)", "Premium III (40%)", "Premium Ouro I (20%)"]
            },
            tipoColor: 'corpe',
            requerTaxa: true,
            imagens: {
                "Coletivo por Adesão": {
                    "Premium (IV, III, II e I)": "https://i.imgur.com/2NV3gzS.jpeg",
                    "Premium (IV, III e II)": "https://i.imgur.com/5FasB5c.jpeg",
                    "Premium (IV e III)": "https://i.imgur.com/5FasB5c.jpeg",
                    "Premium (IV,II e I)": "https://i.imgur.com/zRbS6Sy.jpeg",
                    "Premium (IV, III e I)": "https://i.imgur.com/xJDVQ8t.jpeg",
                    "Premium (IV e II)": "https://i.imgur.com/c8lh5PZ.jpeg",
                    "Premium (IV e I)": "https://i.imgur.com/GRyUjJC.jpeg",
                    "Premium (IV)": "https://i.imgur.com/H4G9mrp.jpeg",
                    "Premium (III, II e I)": "https://i.imgur.com/PR67da1.jpeg",
                    "Premium (III e II)": "https://i.imgur.com/fOSVhbx.jpeg",
                    "Premium (III e I)": "https://i.imgur.com/bGawY2q.jpeg",
                    "Premium (III)": "https://i.imgur.com/VxV4hp8.jpeg",
                    "Premium (II e I)": "https://i.imgur.com/PfSNFl1.jpeg",
                    "Premium (II)": "https://i.imgur.com/wQqBKyv.jpeg",
                    "Premium (I)": "https://i.imgur.com/xzfOIl0.jpeg"
                }
            }
        },
        "Corpe (MS)": {
            tipos: {
                "Coletivo por Adesão": ["Premium II (30%)", "Premium III (40%)", "Premium IV (50%)", "Premium Ouro III (40%)"]
            },
            tipoColor: 'corpe',
            requerTaxa: true,
            imagens: {
                "Coletivo por Adesão": {
                    "Premium (IV, III e II)": "https://i.imgur.com/PcSR6An.jpeg",
                    "Premium (IV e III)": "https://i.imgur.com/MqRNsKz.jpeg",
                    "Premium (IV e II)": "https://i.imgur.com/liO39f9.jpeg",
                    "Premium (IV)": "https://i.imgur.com/Sg2rgoC.jpeg",
                    "Premium (III e II)": "https://i.imgur.com/9lC3Ly5.jpeg",
                    "Premium (III)": "https://i.imgur.com/o4PiQb0.jpeg",
                    "Premium (II)": "https://i.imgur.com/35olPDE.jpeg"
                }
            }
        },
        "Corpe (DRD)": {
            tipos: {
                "Coletivo por Adesão": ["Premium II (30%)", "Premium III (40%)", "Premium IV (50%)", "Premium Ouro III (40%)"]
            },
            tipoColor: 'corpe',
            requerTaxa: true,
            imagens: {
                "Coletivo por Adesão": {
                    "Premium (IV, III e II)": "https://i.imgur.com/dVYQiaf.jpeg",
                    "Premium (IV e III)": "https://i.imgur.com/EdHLGOF.jpeg",
                    "Premium (IV e II)": "https://i.imgur.com/ZhXFbK8.jpeg",
                    "Premium (IV)": "https://i.imgur.com/zIhVPAF.jpeg",
                    "Premium (III e II)": "https://i.imgur.com/8bzLg6v.jpeg",
                    "Premium (III)": "https://i.imgur.com/3fUoebk.jpeg",
                    "Premium (II)": "https://i.imgur.com/BJKX06o.jpeg"
                }
            }
        },
        "Lancers (SP)": {
            tipos: {
                "Coletivo por Adesão": ["Premium I (20%)", "Premium II (30%)", "Premium III (40%)", "Premium Ouro I (20%)"]
            },
            tipoColor: 'lancers',
            requerTaxa: true,
            imagens: {
                "Coletivo por Adesão": {
                    "Premium (III, II e I)": "https://i.imgur.com/oQEyNRb.jpeg",
                    "Premium (III e II)": "https://i.imgur.com/TJQT8IL.jpeg",
                    "Premium (III e I)": "https://i.imgur.com/PbGq6ZB.jpeg",
                    "Premium (III)": "https://i.imgur.com/4LBitJb.jpeg",
                    "Premium (II e I)": "https://i.imgur.com/BlnAx3Q.jpeg",
                    "Premium (II)": "https://i.imgur.com/KZifxpp.jpeg",
                    "Premium (I)": "https://i.imgur.com/KnNxd99.jpeg"
                }
            }
        },
        "Lancers (MS)": {
            tipos: {
                "Coletivo por Adesão": ["Premium II (30%)", "Premium III (40%)", "Premium IV (50%)", "Premium Ouro III (40%)"]
            },
            tipoColor: 'lancers',
            requerTaxa: true,
            imagens: {
                "Coletivo por Adesão": {
                    "Premium (IV, III e II)": "https://i.imgur.com/w1An0Tx.jpeg",
                    "Premium (IV e III)": "https://i.imgur.com/mWBWg8L.jpeg",
                    "Premium (IV e II)": "https://i.imgur.com/E78fdlE.jpeg",
                    "Premium (IV)": "https://i.imgur.com/0K4G6qp.jpeg",
                    "Premium (III e II)": "https://i.imgur.com/hlURjNz.jpeg",
                    "Premium (III)": "https://i.imgur.com/j0ndycg.jpeg",
                    "Premium (II)": "https://i.imgur.com/vZuARKn.jpeg"
                }
            }
        },
        "Lancers (DRD)": {
            tipos: {
                "Coletivo por Adesão": ["Premium II (30%)", "Premium III (40%)", "Premium IV (50%)", "Premium Ouro III (40%)"]
            },
            tipoColor: 'lancers',
            requerTaxa: true,
            imagens: {
                "Coletivo por Adesão": {
                    "Premium (IV, III e II)": "https://i.imgur.com/XFBCV14.jpeg",
                    "Premium (IV e III)": "https://i.imgur.com/PDNTUd1.jpeg",
                    "Premium (IV e II)": "https://i.imgur.com/cu9pSXu.jpeg",
                    "Premium (IV)": "https://i.imgur.com/6lUlMW8.jpeg",
                    "Premium (III e II)": "https://i.imgur.com/8RqX2GW.jpeg",
                    "Premium (III)": "https://i.imgur.com/ugZ34Pu.jpeg",
                    "Premium (II)": "https://i.imgur.com/PkI4AyI.jpeg"
                }
            }
        }
    }
};

console.log('%c✅ APP_DATA carregado', 'color: #16a34a; font-weight: bold;');
