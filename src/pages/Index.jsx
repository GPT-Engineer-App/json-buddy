import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ClipboardCopy, Eye, EyeOff, FileJson, Zap } from "lucide-react";

const generateRandomJson = () => {
  const randomData = {
    name: "John Doe",
    age: 30,
    city: "New York",
    hobbies: ["reading", "swimming", "coding"],
    education: {
      degree: "Bachelor's",
      major: "Computer Science",
      year: 2015
    },
    isEmployed: true,
    salary: null
  };
  
  // Poorly format the JSON string
  return JSON.stringify(randomData)
    .replace(/[{},]/g, (match) => `\n${match}\n`)
    .replace(/:/g, ' :')
    .replace(/\[/g, '[\n  ')
    .replace(/\]/g, '\n]')
    .replace(/"/g, (match, index, string) => index % 2 === 0 ? `\n${match}` : `${match}\n`);
};

const Index = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [isTreeView, setIsTreeView] = useState(false);
  const [jsonStats, setJsonStats] = useState({ keys: 0, depth: 0 });

  const handleFormatJson = () => {
    let inputToFormat = jsonInput.trim();
    if (inputToFormat.toLowerCase() === "test") {
      inputToFormat = generateRandomJson();
      setJsonInput(inputToFormat);
      toast.info("Using randomly generated JSON for testing!");
    }

    try {
      const parsedJson = JSON.parse(inputToFormat);
      const prettyJson = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(prettyJson);
      updateJsonStats(parsedJson);
      toast.success("JSON formatted successfully!");
    } catch (error) {
      toast.error("Invalid JSON input!");
    }
  };

  const handleValidateJson = () => {
    try {
      JSON.parse(jsonInput);
      toast.success("Valid JSON!");
    } catch (error) {
      toast.error("Invalid JSON!");
    }
  };

  const handleToggleTreeView = () => {
    setIsTreeView(!isTreeView);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson);
    toast.success("Formatted JSON copied to clipboard!");
  };

  const updateJsonStats = (json) => {
    const keys = Object.keys(json).length;
    const depth = getJsonDepth(json);
    setJsonStats({ keys, depth });
  };

  const getJsonDepth = (obj) => {
    let depth = 0;
    if (obj && typeof obj === "object") {
      Object.keys(obj).forEach((key) => {
        const tempDepth = getJsonDepth(obj[key]);
        if (tempDepth > depth) {
          depth = tempDepth;
        }
      });
      depth++;
    }
    return depth;
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">JSON Buddy</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardContent className="p-6">
            <Label htmlFor="jsonInput" className="text-lg font-semibold mb-2 block">
              JSON Input
            </Label>
            <Input
              id="jsonInput"
              as="textarea"
              rows="10"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full mb-4 font-mono text-sm"
              placeholder="Paste your JSON here or type 'test' for a random example..."
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button onClick={handleFormatJson} className="w-full">
                <FileJson className="mr-2 h-4 w-4" /> Format
              </Button>
              <Button onClick={handleValidateJson} className="w-full">
                <Zap className="mr-2 h-4 w-4" /> Validate
              </Button>
              <Button onClick={handleToggleTreeView} className="w-full">
                {isTreeView ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                {isTreeView ? "Raw JSON" : "Tree View"}
              </Button>
              <Button onClick={handleCopyToClipboard} className="w-full">
                <ClipboardCopy className="mr-2 h-4 w-4" /> Copy
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2">
          <CardContent className="p-6">
            <Label className="text-lg font-semibold mb-2 block">JSON Output</Label>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 max-h-96 overflow-auto">
              {isTreeView ? (
                <pre className="text-sm">{JSON.stringify(JSON.parse(formattedJson), null, 2)}</pre>
              ) : (
                <SyntaxHighlighter language="json" style={atomOneDark} customStyle={{background: 'transparent'}}>
                  {formattedJson}
                </SyntaxHighlighter>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">JSON Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                <p className="text-2xl font-bold">{jsonStats.keys}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Number of keys</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                <p className="text-2xl font-bold">{jsonStats.depth}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Depth of nesting</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Tip</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Type 'test' in the input field and click 'Format' to see a randomly generated, poorly-formatted JSON example.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;