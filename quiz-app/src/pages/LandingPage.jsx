import { useNavigate } from "react-router";
import { useEffect, useContext, useState } from 'react'
import { getQuestion } from "../services/api";
import { DataContext } from "../context/context";
import { saveToStorage } from "../utils";
import { LandingCard } from "../components/LandingCard";

export default function LandingPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const handleNaviagte = () => {
    navigate("/questionnaire/1")
  }

  const { setQuestions } = useContext(DataContext)

  useEffect(() => {
    handleGetQuextion();
  }, [])

  const handleGetQuextion = () => {
    setIsLoading(true);
    getQuestion().then(data => {
      if (data) {
        setQuestions(data);
        saveToStorage("questions", data);
      }
    }).finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <LandingCard isLoading={isLoading} navig={handleNaviagte} />
  )
}