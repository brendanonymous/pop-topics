function Bubble( { title, size } ){
    return (
        <div style={{ 
            background: 'skyblue', 
            width: `${size}px`, 
            height: `${size}px`, 
            WebkitBorderRadius: '100%', 
            borderRadius: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            color: 'white'
        }}>{ title }</div>
    );
}

export default Bubble;