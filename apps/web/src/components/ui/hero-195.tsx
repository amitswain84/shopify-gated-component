import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Hero195() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Hero Section Placeholder <br className="hidden sm:inline" />
          (Waiting for Code)
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          The code provided for Hero195 was actually the Card component. 
          I have set up all the dependencies (BorderBeam, Tabs, etc.) so once you provide the Hero code, it will work immediately.
        </p>
      </div>
      <div className="flex gap-4">
        <Button>Get Started</Button>
        <Button variant="outline">Learn more</Button>
      </div>
      
      {/* Demonstration of dependencies working */}
      <div className="relative rounded-xl border bg-card text-card-foreground shadow-sm w-full max-w-lg mt-8 overflow-hidden">
        <BorderBeam />
        <CardHeader>
            <CardTitle>Dependencies Ready</CardTitle>
            <CardDescription>This card uses the requested BorderBeam and Card components.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="account" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Make changes to your account here.</TabsContent>
              <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
        </CardContent>
      </div>
    </section>
  )
}
