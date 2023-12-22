import { useNavigate } from 'react-router-dom';

function HistoryItem(props){
    const navigate = useNavigate();
    
    const goToPokemonInfo = (pokemonName) => {
        navigate(`/pokemon/${pokemonName.toLowerCase()}`);
      };

    return (
            <div className="history">
                <img className="img_3" 
                    src={props.image} 
                    alt="" 
                    onClick={() => goToPokemonInfo(props.name)}
                ></img>
                <div className="textBox-history">
                    <div className="pokemonName">
                        {props.name}
                    </div>
                    <div className="introText-history">
                        {props.intro}
                    </div>
                </div>
                <div className="date">
                    {props.date}
                </div>
            </div>
        
    );
}

export default HistoryItem;