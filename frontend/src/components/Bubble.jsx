function Bubble( { className, title, size } ){
    const fontSize = size * 0.12;
    return (
        <div className={className} style={{ 
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
            color: 'black'
        }}>{ title }</div>
    );
}

export default Bubble;