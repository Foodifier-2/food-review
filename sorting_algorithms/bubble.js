function bubbleSortLH(arr){

    //Outer pass
    for(let i = 0; i < arr.length; i++){

        //Inner pass
        for(let j = 0; j < arr.length - i - 1; j++){

            //Value comparison using ascending order

            if(arr[j + 1].rating < arr[j].rating){

                //Swapping
                [arr[j + 1],arr[j]] = [arr[j],arr[j + 1]]
            }
        }
    };
    return arr;
};

function bubbleSortHL(arr){

    //Outer pass
    for(let i = 0; i < arr.length; i++){

        //Inner pass
        for(let j = 0; j < arr.length - i - 1; j++){

            //Value comparison using ascending order

            if(arr[j + 1].rating > arr[j].rating){

                //Swapping
                [arr[j + 1],arr[j]] = [arr[j],arr[j + 1]]
            }
        }
    };
    return arr;
};

module.exports = {
    bubbleSortLH,
    bubbleSortHL
};