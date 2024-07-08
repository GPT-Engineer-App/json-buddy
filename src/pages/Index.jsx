import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Index = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [isTreeView, setIsTreeView] = useState(false);
  const [jsonStats, setJsonStats] = useState({ keys: 0, depth: 0 });

  const formatJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const prettyJson = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(prettyJson);
      updateJsonStats(parsedJson);
      toast.success("JSON formatted successfully!");
    } catch (error) {
      toast.error("Invalid JSON input!");
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(jsonInput);
      toast.success("Valid JSON!");
    } catch (error) {
      toast.error("Invalid JSON!");
    }
  };

  const toggleTreeView = () => {
    setIsTreeView(!isTreeView);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson);
    toast.success("Copied to clipboard!");
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">JSON Formatter and Validator</h1>
      <Card>
        <CardHeader>
          <CardTitle>JSON Input</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            as="textarea"
            rows="10"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="w-full mb-4"
          />
          <div className="flex space-x-2 mb-4">
            <Button onClick={formatJson}>Format JSON</Button>
            <Button onClick={validateJson}>Validate JSON</Button>
            <Button onClick={toggleTreeView}>Toggle Tree View</Button>
            <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Output</h2>
            {isTreeView ? (
              <pre>{JSON.stringify(JSON.parse(formattedJson), null, 2)}</pre>
            ) : (
              <SyntaxHighlighter language="json" style={docco}>
                {formattedJson}
              </SyntaxHighlighter>
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">JSON Statistics</h2>
            <p>Number of keys: {jsonStats.keys}</p>
            <p>Depth of nesting: {jsonStats.depth}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;