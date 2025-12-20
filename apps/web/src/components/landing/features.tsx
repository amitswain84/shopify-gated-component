"use client";

import { Eye, Target, Smile } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Safari } from "@/components/ui/safari";

export function Features() {
    return (
        <section className="relative w-full bg-white py-12 md:py-24 border-b border-gray-200">
            {/* Grid lines: centered 1200px vertical lines */}
            <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-0 flex justify-center">
                <div className="w-full max-w-[1200px] border-x border-gray-200/60 h-full" />
            </div>

            <div className="container relative z-10 mx-auto px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-8">
                    <div className="text-center space-y-3 mb-12">
                        <h2 className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl font-geist-sans text-black">
                            Powerful Analytics
                        </h2>
                        <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed font-inter">
                            Everything you need to dominate the AI search results.
                        </p>
                    </div>

                    <Tabs defaultValue="visibility" className="w-full flex flex-col items-center">
                        {/* Custom Tab List styling to look like badges - transparent bg, gap, no p-1 */}
                        <TabsList className="flex flex-wrap items-center justify-center gap-2 mb-12 bg-transparent h-auto p-0">
                            <TabsTrigger
                                value="visibility"
                                className="font-inter font-medium text-gray-600 border border-transparent bg-gray-50/50 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-gray-200 data-[state=active]:shadow-sm rounded-md px-3 py-1.5 h-auto text-sm gap-2"
                            >
                                <Eye className="w-4 h-4 text-gray-500 data-[state=active]:text-black" />
                                Visibility
                            </TabsTrigger>
                            <TabsTrigger
                                value="position"
                                className="font-inter font-medium text-gray-600 border border-transparent bg-gray-50/50 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-gray-200 data-[state=active]:shadow-sm rounded-md px-3 py-1.5 h-auto text-sm gap-2"
                            >
                                <Target className="w-4 h-4 text-gray-500 data-[state=active]:text-black" />
                                Position
                            </TabsTrigger>
                            <TabsTrigger
                                value="sentiment"
                                className="font-inter font-medium text-gray-600 border border-transparent bg-gray-50/50 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-gray-200 data-[state=active]:shadow-sm rounded-md px-3 py-1.5 h-auto text-sm gap-2"
                            >
                                <Smile className="w-4 h-4 text-gray-500 data-[state=active]:text-black" />
                                Sentiment
                            </TabsTrigger>
                        </TabsList>

                        {/* Safari Component Container - using imageSrc as requested */}
                        <TabsContent value="visibility" className="w-full max-w-[1203px]">
                            <Safari url="peec.ai/dashboard/visibility" imageSrc="https://ui.aceternity.com/demos/aceternity-ui-demo.png" className="shadow-2xl border-gray-200" />
                        </TabsContent>
                        <TabsContent value="position" className="w-full max-w-[1203px]">
                            <Safari url="peec.ai/dashboard/position" imageSrc="https://ui.aceternity.com/demos/aceternity-ui-demo.png" className="shadow-2xl border-gray-200" />
                        </TabsContent>
                        <TabsContent value="sentiment" className="w-full max-w-[1203px]">
                            <Safari url="peec.ai/dashboard/sentiment" imageSrc="https://ui.aceternity.com/demos/aceternity-ui-demo.png" className="shadow-2xl border-gray-200" />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </section>
    );
}
