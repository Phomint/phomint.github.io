# World Quantum Day: What I learned while trying (and "failing") to beat classical Machine Learning with Qubits

Today, April 14, 2026, we celebrate World Quantum Day. To mark the date, I decided to open my "black box" of studies and share how my transition went from a total beginner to executing Machine Learning algorithms on real IBM quantum processors.

---

## 1. The Starting Point: Superposition and the "Hello World"

Until recently, my technical knowledge of quantum physics was summarized in abstract concepts: I knew about superposition (Schrödinger's cat both alive and dead) and that everything was based on probabilities. But how does that turn into code?

I started with the basics: the Hadamard gate (H). In the quantum world, this is our "Hello World." While a classical bit is 0 or 1, the Hadamard gate puts the qubit into a state where it is both things at the same time. It's like spinning a coin: while it's spinning, it's neither heads nor tails; it's a probability.

<div class="quantum-viz-container" id="quantum-viz">
    <div class="quantum-viz-header">
        <h4>Superposition Simulation (Qubit)</h4>
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
    <button class="measurement-btn">Measure Qubit</button>
    <div class="measurement-result"></div>
</div>

My first code: I implemented a simple circuit to put a qubit in superposition and measure the result. You can check this humble beginning here: [Hadamard.ipynb](https://github.com/Phomint/Quantum/blob/master/Hadamard.ipynb).

---

## 2. The Big Leap: Quantum Machine Learning (QML)

After understanding how to create superposition, I decided to jump straight into the "abyss": I tried to apply these concepts in the corporate world using Quantum Machine Learning.

The goal was to use the Credit-G dataset (credit risk classification) and see if a quantum computer could "see" delinquency patterns better than a traditional algorithm.

For this, I used the most current stack of 2026:

- **Qiskit 2.3**: Modern functional API.
- **SamplerV2**: To extract precision data from real hardware.
- **VQC (Variational Quantum Classifier)**: A quantum neural network that adjusts its "weights" (rotation angles of the qubits) to learn from the data.

You can check the full model code and results analysis here: [Quantum_classification.ipynb](https://github.com/Phomint/Quantum/blob/master/Quantum_classification.ipynb).

---

## 3. The Reality Check on Real Hardware

Many stay only in simulators (where everything is perfect). I took the challenge to the IBM Fez, a real 127-qubit processor of the Eagle architecture.

The result? An accuracy of approximately 55%.

For those looking only for high numbers, this seems like a failure. For a quantum developer, this is a golden lesson. I understood in practice that:

- **Noise is real**: In the physical chip, heat and interference degrade the information.
- **Dimensionality matters**: Using only 4 qubits for 4 financial variables still doesn't offer "Quantum Advantage." The classical model (like XGBoost) is still king for this type of simple tabular data.
- **Entanglement isn't magic**: It's a complex mathematical tool that requires scale to surpass classical processing.

---

## 4. Lessons from 2026 for the Future

My journey from the Hadamard gate to training a credit model on real hardware taught me that quantum computing today isn't about speed, but about representation capacity.

We are in the era where we learn to tame the noise. Failing a classification model today is part of building the infrastructure that will solve "impossible" problems tomorrow, such as new materials or global logistics optimizations.

Happy World Quantum Day! The important thing isn't just getting the result right, but understanding why the atom behaves that way.

---

**Resources and sources:**
- [PennyLane QML Tutorials](https://pennylane.ai/qml/demos/tutorial_annni)
- [IBM Quantum Tutorials: CHSH Inequality](https://quantum.cloud.ibm.com/docs/en/tutorials/chsh-inequality)
- [From Zero to Quantum | Use A Quantum Computer Today](https://www.youtube.com/watch?v=vSFv_i_FAXg)

---

**Patrick Amaral**  
*Data Scientist | Developer | Stargazer*  
Instagram: [@phomint__](https://www.instagram.com/phomint__)
