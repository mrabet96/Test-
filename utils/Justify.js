module.exports =  (text) => {
    const offset = Math.floor(text.length/80);
    const arrayOfLines =[];
    for( let i = 0; i < offset; i++){
        arrayOfLines[i]= text.substring(80*i, 80*(i+1));
    }
    if( text.length > 80*offset ){
        arrayOfLines[offset]= text.substring(80*offset)
    }
    return arrayOfLines.join('\n');
}
