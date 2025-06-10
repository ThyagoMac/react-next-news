import { exames } from "@/constants/exames";

export default class ExameTool {
  constructor({ data }) {
    this.data = data || { selecionados: [] };
    this.wrapper = undefined;
  }

  render() {
    this.wrapper = document.createElement("div");

    exames.forEach((exame) => {
      const container = document.createElement("div");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = exame.nome;
      checkbox.checked = this.data.selecionados?.some(
        (e) => e.nome === exame.nome,
      );

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          this.data?.selecionados?.push(exame);
        } else {
          this.data.selecionados = this.data.selecionados.filter(
            (e) => e.nome !== exame.nome,
          );
        }
        this._renderSelecionados();
      });

      const label = document.createElement("label");
      label.setAttribute("for", exame.nome);
      label.innerText = exame.nome;

      container.appendChild(checkbox);
      container.appendChild(label);
      this.wrapper.appendChild(container);
    });

    this.selecionadosContainer = document.createElement("div");
    this.selecionadosContainer.style.marginTop = "10px";
    this.wrapper.appendChild(this.selecionadosContainer);

    this._renderSelecionados();

    return this.wrapper;
  }

  _renderSelecionados() {
    this.selecionadosContainer.innerHTML = "";

    if (!this.data?.selecionados?.length) {
      this.selecionadosContainer.innerText = "Nenhum exame selecionado.";
      return;
    }

    this.data.selecionados.forEach((exame) => {
      const item = document.createElement("div");
      item.style.marginBottom = "8px";
      item.innerHTML = `<strong>${exame.nome}</strong>: ${exame.descricao}`;
      this.selecionadosContainer.appendChild(item);
    });
  }

  save() {
    return this.data;
  }

  static get toolbox() {
    return {
      title: "Exames",
      icon: "🧪",
    };
  }
}
