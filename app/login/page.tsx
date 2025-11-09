"use client"
import { GalleryVerticalEnd } from "lucide-react"
import TextType from '../../components/TextType';
import GradientText from '../../components/GradientText'
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:flex items-center justify-center h-screen text-center px-6">
        {/* GIF Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/login.gif')" }}
        ></div>
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative max-w-lg z-10">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class text-5xl font-bold text-white mb-4"
          >
            We Welcome You All
          </GradientText>
          {/* <h1 className="text-5xl font-bold text-white mb-4">l</h1> */}
          <TextType
            text={["We believe in bringing together diverse voices and perspectives to build a stronger nation.",
               "We push for equal treatment and fair opportunities for all citizens regardless of background or status.",
                "Thank you, We appreciate for joining us"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            className="text-2xl text-white/80 mt-10"
            cursorCharacter="|" 
            variableSpeed={undefined}
            onSentenceComplete={undefined} 
            />
          {/* <p className="text-xl text-white/80 mt-10">
            
          </p> */}
        </div>
      </div>

    </div>
  )
}
