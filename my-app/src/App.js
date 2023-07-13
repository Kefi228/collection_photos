import React, { useEffect, useState } from 'react';
import { Collection } from './Collection';
import './index.scss';

const cats =[
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const[categoryId, setCategoryId] = useState(0);
  const[page, setPage] = useState(1);
  const[isLoading, setIsLoading] = useState(true);
  const[searchValue, setSearchValue] = useState('');
  const[collections, setCollection] =useState([]);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : ''
    const pageParam = `page=${page}`;
    fetch(`https://64aff095c60b8f941af4e812.mockapi.io/photo_collection?page=${page}&limit=3${category}`)
    .then((res) => res.json())
    .then((json) => {
      setCollection(json)
      console.log(json)
    })
    .catch((err) => {
      console.warn(err);
      alert('Не удалось получить информацию с сервера');
    })
    .finally(() => setIsLoading(false));
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, i)=> (<li onClick={()=> setCategoryId(i)} className={categoryId===i ? 'active' : ''} key={obj.name}>{obj.name}</li>))
          }
        </ul>
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
          {isLoading ? (<h2>Идёт загрузка...</h2>) :  
        (collections.filter(obj =>{
          return obj.name.toLowerCase().includes(searchValue.toLowerCase());
        }).map((obj, index) => ( <Collection
          key={index}
          name= {obj.name}
          images={obj.photos}
        />)))
       }
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_, i) => <li onClick={()=> setPage(i + 1)} className={page===(i+1) ? 'active' : ''}>{i + 1}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
