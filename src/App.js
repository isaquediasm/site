import Inferno from 'inferno';
import Component from 'inferno-component';
import { ChatBox } from './components'
import { ButtonExpand } from './components/Buttons'
import Logo from './logo';
import './App.css';
import dcmn from './assets/companies/dcmn.png'
import abroadwith from './assets/companies/abroadwith.png'
import jusbrasil from './assets/companies/jusbrasil.png'
import clicoupartiu from './assets/companies/clicoupartiu.png'
import navibe from './assets/companies/navibe.png'
import react from './assets/react.png'
import redux from './assets/redux.png'
import relay from './assets/relay.svg'
import webpack from './assets/webpack.png'

import sass from './assets/sass.svg'

const JobItem = ({
  id,
  companyLogo,
  companyName,
  website,
  title,
  place,
  description,
  showProjects,
  handleShowProjects,
}) => (
  <div className="job">
    <img className="logo" src={companyLogo} />
    <div className="info">
      <h3 className="title">{title}</h3>
      <h4 className="company">
        { website 
            ? <a href={website} target="_blank">{companyName}</a>
            : companyName
        }
      </h4>
      <h5 className="place">{place}</h5>
      <p className="description">{description}</p>
      {showProjects && <div className="projects">
        <div className="project-item">
          <h3 className="title">Emotify</h3>
          <p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid laborum officia maiores doloremque nulla, hic maxime odit assumenda porro repellat, similique illum sapiente. Assumenda esse ea modi molestias sint officiis!</p>
        </div>
        <div className="project-item">
          <h3 className="title">Emotify</h3>
          <p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid laborum officia maiores doloremque nulla, hic maxime odit assumenda porro repellat, similique illum sapiente. Assumenda esse ea modi molestias sint officiis!</p>
        </div>
      </div>}
      <ButtonExpand onClick={() => handleShowProjects(id)}>
        {showProjects ? 'Hide Projects' : 'See Projects'}
      </ButtonExpand>
    </div>
  </div>
)

class App extends Component {
  state = {
    jobs: {
      abroadwith: {
        title: 'Freelance Frontend Developer',
        place: 'Berlin, Germany',
        description: 'Front-end development at DCMN, working with front-end technologies like React and Reflux.',
        companyLogo: abroadwith,
        companyName: 'Abroadwith',
        website: 'http://www.abroadwith.com',
        showProjects: false,
      },
      dcmn: {
        title: 'Frontend Developer',
        place: 'Berlin, Germany',
        description: 'Front-end development at DCMN, working with front-end technologies like React and Reflux.',
        companyLogo: dcmn,
        companyName: 'DCMN',
        website: 'http://www.dcmn.com',
        showProjects: false,
      },
      jusbrasil: {
        title: 'Frontend Developer',
        place: 'Salvador, Brazil',
        description: `Frontend development in one of the most accessed web platforms in Brazil. Working with a up-to-date stack like React, Redux, Reflux, Relay, Node, GraphQL, etc.`,
        companyLogo: jusbrasil,
        companyName: 'Jusbrasil',
        website: 'http://www.jusbrasil.com.br',
        showProjects: false,
      },
      clicoupartiu: {
        title: 'Co-founder',
        place: 'Salvador, Brazil',
        description: 'Responsible for the intern and extern products development. The product creation was given in these steps; market research, user research, case studies, customer validation, etc.',
        companyLogo: clicoupartiu,
        companyName: 'Clicou Partiu',
        showProjects: false,
      },
      navibe: {
        title: 'Co-founder',
        place: 'Salvador, Brazil',
        description: `Acting from the conception to the maturation of the business model, 
        responsible for the product development; 
        front-end development, UI/UX design, 
        usability studies, release management, etc. 
        Also part of the administrative sector by applying commercial rules, 
        formalization and validation of the business plan.`,
        companyLogo: navibe,
        companyName: 'Navibe',
        showProjects: false,
      },
    },
  }

  handleShowProjects = (id) => {
    const jobs = this.state.jobs
    const company = this.state.jobs[id]
    
    console.log('oi');
    this.setState({
      jobs: {
        ...jobs,
        [id]: {
          ...company,
          showProjects: !company.showProjects,
        }
      }
    })
  } 

  render() {
    const { jobs } = this.state

    return (
      <div className="App">
        <div className="intro">
          {/*<h1 className="title">Hello.</h1>
          <h2 className="subtitle">I'm Isaque, a frontend engineer based in Berlin.</h2>
          <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, fugiat commodi ab, error deserunt ipsam nihil quidem, autem dolores, cumque vel minus pariatur ut nemo dolore quod expedita ipsum nisi.</p>
          */}
          <ChatBox />
        </div>
        <div className="container experience">
          <h1 className="title">Experience</h1>
          {Object.keys(jobs).map(key => (
            <JobItem
              id={key}
              handleShowProjects={this.handleShowProjects}
              {...jobs[key]}
            />
          ))}    
        </div>
        <div className="container skills">
          <h1 className="title">Stack</h1>
          <div className="skill-item">React</div>
          <div className="skill-item">Redux</div>
          <div className="skill-item">Relay</div>
          <div className="skill-item">Webpack</div>
          <div className="skill-item">Sass</div>
        </div>
      </div>
    );
  }
}

export default App;
