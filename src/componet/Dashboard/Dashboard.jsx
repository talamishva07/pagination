import React, { useEffect, useState } from "react";
import Style from '../Dashboard/Dashboard.module.css';
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [tableIndex, setTableIndex] = useState(0);
    const [totalundex, setTotalundex] = useState(10);
    const [pageNo, setPageNO] = useState(1);


    const [login, setLogin] = useState(false)
    useEffect(() => {
        const acf = sessionStorage.getItem('ok')
        if (acf) {
            setLogin(true)
        } else {
            setLogin(false)
            navigate('/form');

        }
    })





    useEffect(() => {
        const fData = async () => {
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "GET"
            }).then((res) => res.json())
                .then((data) => {
                    setData(data);
                    setCount(data.length / 10)

                })
                .catch((error) => console.log('error::: ', error))
        }
        fData();

    }, [])
    const clickToGo = (num) => {
        const total = data.length;
        const half = total / count;
        const totalLastValue = half * num;
        setTotalundex(totalLastValue);
        setTableIndex(totalLastValue - 10);
        setPageNO(num);
    }


    const privePage = () => {
        if (pageNo !== 1) {
            clickToGo(pageNo - 1)
        }
    }
    const nextPage = () => {
        if (data.length > totalundex) {
            clickToGo(pageNo + 1)
        }
    };
    return (

        <div>
            <center>
                <table>
                    <thead>
                        <th>id</th>
                        <th>userId</th>
                        <th>title</th>
                        <th>body</th>

                    </thead>
                     <tbody >
                        { data.slice(tableIndex, totalundex).map((item, index) => (
                            <tr key={ index } className={ Style.tablebody }>
                                <td>{ index + 1 }</td>
                                <td>{ item.userId }</td>
                                <td>{ item.title }</td>
                                <td>{ item.body }</td>
                            </tr>
                        )) }
                    </tbody>

                </table>
                <center>
                    <nav aria-label="Page navigation example m-auto">
                        <ul className="pagination">
                            <li className="page-item"><p className="page-link" onClick={ privePage }>Previous</p></li>
                            {
                                Array.from({ length: count }, (ele, index) => {
                                    return (
                                        <li key={ index } onClick={ () => clickToGo(index + 1) } className="page-item">
                                            <p className={ pageNo == index + 1 ? `page-link ${Style.linkcolor} active` : `page-link` }>
                                                { index + 1 }
                                            </p>
                                        </li>
                                    )
                                })
                            }
                            <li className="page-item"><p className="page-link" onClick={ nextPage }>Next</p></li>
                        </ul>
                    </nav>
                </center>
            </center>
        </div>
    )
}
export default Dashboard