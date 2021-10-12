import axios from 'axios';
import React, { useEffect, useState } from 'react'
import House from "../house/House"; 
import './houses.css';

export default function Houses() {
    const [list, setList] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // axios(`http://localhost:3001/house?page=${pageNum}&size=3`)
        axios(`https://houseapi1.herokuapp.com/house?page=${pageNum}&size=3`)
        .then(res=>setList(list=>[...list, ...res.data.data]))
        setLoading(false);
    }, [pageNum])

    const scrollToEnd = () => {
        if(pageNum*3 > list.length) {
            setLoading(false);
        }
        else {      
            setLoading(true);
            setPageNum(pageNum+1);
        }
        
    }

    window.onscroll = function(ev) {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            scrollToEnd();
        }
        // if ((document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight) {
        //     scrollToEnd();
        // }
    };

    return (
        <div className="houses_container">
            {
                list.length > 0 && list.map((el, i) => (
                    <House key={i} data={el} />
                ))
            }
            <div className="load_screen">
                {
                    loading && 
                    <h1 class="load_text">
                        Loading...
                    </h1>
                }
            </div>
        </div>
    )
}
