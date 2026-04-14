# World Quantum Day: O que aprendi ao tentar (e "falhar") em bater o Machine Learning clássico com Qubits

Hoje, 14 de abril de 2026, comemoramos o Dia Mundial Quântico. Para marcar a data, decidi abrir minha "caixa preta" de estudos e compartilhar como foi minha transição de um total iniciante para a execução de algoritmos de Machine Learning em processadores quânticos reais da IBM.

---

## 1. O Ponto de Partida: Superposição e o "Hello World"

Até pouco tempo atrás, meu conhecimento técnico sobre física quântica era resumido a conceitos abstratos: eu sabia que existia a superposição (o gato de Schrödinger vivo e morto) e que tudo se baseava em probabilidades. Mas como isso vira código?

Comecei pelo básico: o portão Hadamard (H). No mundo quântico, esse é o nosso "Hello World". Enquanto um bit clássico é 0 ou 1, o portão Hadamard coloca o qubit em um estado onde ele é as duas coisas ao mesmo tempo. É como girar uma moeda: enquanto ela gira, ela não é cara nem coroa; ela é uma probabilidade.

<div class="quantum-viz-container" id="quantum-viz">
    <div class="quantum-viz-header">
        <h4>Simulação de Superposição (Qubit)</h4>
    </div>
    <div class="qubit-scene">
        <div class="qubit-sphere">
            <div class="qubit-coin">
                <div class="coin-face">
                    <span class="qubit-state state-0">0</span>
                    <span class="qubit-state state-1">1</span>
                </div>
            </div>
            <div class="qubit-overlay"></div>
        </div>
    </div>
    <button class="measurement-btn">Medir Qubit</button>
    <div class="measurement-result"></div>
</div>

Meu primeiro código: Implementei um circuito simples para colocar um qubit em superposição e medir o resultado. Você pode conferir esse início humilde aqui: [Hadamard.ipynb](https://github.com/Phomint/Quantum/blob/master/Hadamard.ipynb).

---

## 2. O Grande Salto: Machine Learning Quântico (QML)

Após entender como criar superposição, decidi saltar direto para o "abismo": tentei aplicar esses conceitos no mundo corporativo usando Quantum Machine Learning.

O objetivo era usar o dataset Credit-G (classificação de risco de crédito) e ver se um computador quântico conseguiria "enxergar" padrões de inadimplência melhor que um algoritmo tradicional.

Para isso, utilizei a stack mais atual de 2026:

- **Qiskit 2.3**: API funcional moderna.
- **SamplerV2**: Para extrair dados com precisão do hardware real.
- **VQC (Variational Quantum Classifier)**: Uma rede neural quântica que ajusta seus "pesos" (ângulos de rotação dos qubits) para aprender os dados.

Você pode conferir o código completo do modelo e a análise dos resultados aqui: [Quantum_classification.ipynb](https://github.com/Phomint/Quantum/blob/master/Quantum_classification.ipynb).

---

## 3. O Choque de Realidade no Hardware Real

Muitos ficam apenas em simuladores (onde tudo é perfeito). Eu levaris o desafio para o IBM Fez, um processador real de 127 qubits da arquitetura Eagle.

O resultado? Uma acurácia de aproximadamente 55%.

Para quem busca apenas números altos, isso parece uma falha. Para um desenvolvedor quântico, isso é um aprendizado de ouro. Entendi na prática que:

- **Ruído é real**: No chip físico, o calor e a interferência degradam a informação.
- **Dimensionalidade importa**: Usar apenas 4 qubits para 4 variáveis financeiras ainda não oferece a "Vantagem Quântica". O modelo clássico (como um XGBoost) ainda é o rei para esse tipo de dado tabular simples.
- **Emaranhamento não é mágica**: É uma ferramenta matemática complexa que exige escala para superar o processamento clássico.

---

## 4. Lições de 2026 para o Futuro

Minha jornada do portão Hadamard até o treinamento de um modelo de crédito no hardware real me ensinou que a computação quântica hoje não é sobre velocidade, mas sobre capacidade de representação.

Estamos na era onde aprendemos a domar o ruído. Errar um modelo de classificação hoje faz parte da construção da infraestrutura que vai resolver problemas "impossíveis" amanhã, como novos materiais ou otimizações logísticas globais.

Feliz Dia Mundial Quântico! O importante não é apenas acertar o resultado, mas entender por que o átomo se comporta daquela maneira.

---

**Recursos e fontes:**
- [PennyLane QML Tutorials](https://pennylane.ai/qml/demos/tutorial_annni)
- [IBM Quantum Tutorials: CHSH Inequality](https://quantum.cloud.ibm.com/docs/en/tutorials/chsh-inequality)
- [From Zero to Quantum | Use A Quantum Computer Today](https://www.youtube.com/watch?v=vSFv_i_FAXg)

---

**Patrick Amaral**  
*Data Scientist | Developer | Stargazer*  
Instagram: [@phomint__](https://www.instagram.com/phomint__)
