//utils/MedicamentoTool.js
import { medicamentos } from "@/constants/medicamentos";

export default class MedicamentoTool {
  constructor({ data, api }) {
    this.api = api;
    this.data = data || {};
    this.wrapper = undefined;
  }

  render() {
    this.wrapper = document.createElement("div");

    const select = document.createElement("select");
    const defaultOption = document.createElement("option");
    defaultOption.innerText = "Selecione um medicamento";
    defaultOption.disabled = true;
    defaultOption.selected = !this.data.nome;
    select.appendChild(defaultOption);

    medicamentos.forEach((med) => {
      const option = document.createElement("option");
      option.value = med.nome;
      option.innerText = med.nome;
      if (this.data.nome === med.nome) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    const descricao = document.createElement("p");
    descricao.innerText = this.data.descricao || "";

    select.addEventListener("change", (e) => {
      const selecionado = medicamentos.find((m) => m.nome === e.target.value);
      if (selecionado) {
        descricao.innerText = selecionado.descricao;
        this.data = selecionado;
      }
    });

    this.wrapper.appendChild(select);
    this.wrapper.appendChild(descricao);

    return this.wrapper;
  }

  save() {
    return this.data;
  }

  static get toolbox() {
    return {
      title: "Medicamento",
      icon: "💊",
    };
  }
}
