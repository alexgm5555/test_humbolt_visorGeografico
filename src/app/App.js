import React, { Component } from 'react';
import Mapa from './components/maps';


class App extends Component {

  constructor() {
    super();
    this.state = {
      lat: "",
      lng: "",
      estado:true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.addPosition = this.addPosition.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    var elems = document.querySelectorAll('.modal');
    var instances = window.M.Modal.init(elems, options);
    this.showModal()
  }
  handlePositionChange(latitud, longitud) {
    this.setState({ lat: latitud, lng: longitud });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  showModal(){
    document.getElementById('btnModal').click();
  }

  addPosition(e) {
    e.preventDefault();
    fetch('/api/coordinate', {
      method: 'POST',
      body: JSON.stringify({
        lat: parseFloat(this.state.lat),
        lng: parseFloat(this.state.lng)
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        window.M.toast({ html: 'Cordenada guardada' });
        this.setState({
          estado: !this.state.estado
        });
      })
      .catch(err => console.error(err));

  }

  render() {
    const styleContainerMAp = { position: "relative" }
    const styleBtnModel = {
      display:'none'
    }
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="cyan accent-4">
          <div className="container">
            <div className="nav-wrapper">
              <a className="brand-logo">Visor geográfico</a>
              <a onClick = {this.showModal} className="right"><i class="material-icons btn cyan accent-4">help_outline</i></a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addPosition}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="lat" onChange={this.handleChange} value={this.state.lat} type="text" placeholder="Latitud" disabled autoFocus />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="lng" onChange={this.handleChange} value={this.state.lng} cols="30" rows="10" placeholder="Longitud" disabled className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <button type="submit" className="btn cyan accent-4">
                      Enviar
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7" style={styleContainerMAp}>
              <Mapa onChangePosition={this.handlePositionChange} estados={this.state.estado}/>
            </div>
          </div>
        </div>
        <a className="waves-effect waves-light btn modal-trigger"
          data-target="modal1"
          style={styleBtnModel}
          id="btnModal">
          Modal</a>

        <div ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal">
          <div className="modal-content">
            <h4>Indicaciones</h4>
            <p>Es necesario mover el puntero azul para obtener las coordenadas de la ubicación, luego dar clic al boton Enviar.</p>
          </div>
          <div class="modal-footer">
            <a class="modal-close waves-effect waves-green btn-flat">
              Cerrar
          </a>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
