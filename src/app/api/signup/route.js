
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import client from "@/lib/utilies";

const db = client.db("TeamProject1");
const ResistraionCollection = db.collection("USER")
export async function POST(req){
    try{
        const {name, email, password, photo, date, idNumber}= await req.json();
        const exists =await ResistraionCollection.findOne({
            $or: [
                { email: email },
                { idNumber: idNumber }
            ]
        });
        if(exists){
            return NextResponse.json({message:"This email resistrated"})
        }
        else{
           const hashpassword =await bcrypt.hash(password, 10)
            const result = await ResistraionCollection.insertOne({name, email, password:hashpassword, photo, date, idNumber});
            return NextResponse.json({message:"successfull resistration"})
        }
    }catch(err){
        return NextResponse.json({message:"failed resistration"})
    }
}