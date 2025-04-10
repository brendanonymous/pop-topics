function Bubble( { title, size } ){
    const fontSize = size * 0.1;
    return (
        <div style={{ 
            background: 'skyblue', 
            width: `${size}px`, 
            height: `${size}px`, 
            WebkitBorderRadius: '100%', 
            borderRadius: '100%',
            fontSize: `${fontSize}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            color: 'white'
        }}>{ title }</div>
    );
}

export default Bubble;