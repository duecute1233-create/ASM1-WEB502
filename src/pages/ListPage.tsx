import { useState, useEffect } from "react";
import api from "../service/api"
interface Pitche{
id: number;
name: string;
price: number,
location: string,
type: string

}
function ListPage() {
  const [pitches, setPitches] = useState<Pitche[]>([]);
  function getPitches (){
    api.get("/pitches").then((res)=>setPitches(res.data))
  }
useEffect(()=>{getPitches()},[])
function handleDelete(id:number){
  if(window.confirm("Bạn có thực sự muốn xóa mục này?")){
    api.delete(`/pitches/${id}`).then(()=>setPitches((pitche)=> pitche.filter(p => p.id !== id)))
  }
}
const [key,setKey] = useState("")
function handleSearch(){
  api.get(`/pitches?name_like=${key}`).then((res)=>setPitches(res.data

  ))
}

 
const filterType =(e: React.ChangeEvent)=>{
 const type = (e.target as HTMLSelectElement).value
if(type === "0"){
  getPitches()
} else if(type === "Sân 5"){
  api.get(`/pitches?type=${type}`).then((res)=>setPitches(res.data))
} else if (type ==="Sân 7"){
  api.get(`/pitches?type=${type}`).then((res)=>setPitches(res.data))
}
}
  return (
    <div className="p-6">

      <select onChange={(e)=>filterType(e)} name="" id="pitcheType">
        <option value="0">Tất cả</option>
        <option value="Sân 5">Sân 5</option>
        <option value="Sân 7">Sân 7</option>
      </select>
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <div> <input type="text" placeholder="Nhập tên sân bạn cần tìm" value={key} onChange={(e)=>setKey(e.target.value)} />
         <button onClick={()=> handleSearch()}>Tìm kiếm</button></div>
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                price
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                location
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                type
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Giá chơi quá 2 giờ
              </th>
              
              <th className="px-4 py-2 border border-gray-300 text-left">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {pitches.map((pitche)=>{
              return(
                <tr key ={pitche.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">{pitche.id}</td>
              <td className="px-4 py-2 border border-gray-300">{pitche.name}</td>
              <td className="px-4 py-2 border border-gray-300">{pitche.price}</td>
              <td className="px-4 py-2 border border-gray-300">{pitche.location}</td>
              <td className="px-4 py-2 border border-gray-300">{pitche.type}</td>
              <td className="px-4 py-2 border border-gray-300">{pitche.price*2}</td>
              <td className="px-4 py-2 border border-gray-300"><button onClick={()=>{handleDelete(pitche.id)}}>Xóa</button></td>
            </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
