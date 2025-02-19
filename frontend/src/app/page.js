import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div className="" style={{textAlign:"center",height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <h1 style={{fontSize:"45px"}}>Kidney Disease Prediction</h1>
      <p style={{fontSize:"20px",marginTop:"20px"}}>Check Your Kidney's are Healthy <Link href="/Predict"><i className="fa-solid fa-circle-arrow-right fa-2xl" style={{color: "#000000"}}></i></Link></p>
    </div>
  );
}
