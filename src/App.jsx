import React, { useState } from 'react';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import CommandPalette from './components/common/CommandPalette';

// Views
import AdaptiveOverview from './components/overview/AdaptiveOverview';
import AdaptivePlayground from './components/playground/AdaptivePlayground';
import QueryIntelligence from './components/queryIntelligence/QueryIntelligence';
import StrategyEngine from './components/strategyEngine/StrategyEngine';
import DynamicPipeline from './components/dynamicPipeline/DynamicPipeline';
import KnowledgeSources from './components/knowledge/KnowledgeSources';
import RetrievalAnalytics from './components/analytics/RetrievalAnalytics';
import EvaluationLab from './components/evaluation/EvaluationLab';
import ModelConfig from './components/models/ModelConfig';
import ExecutionTraces from './components/traces/ExecutionTraces';
import ApiIntegration from './components/api/ApiIntegration';
import Settings from './components/settings/Settings';

export default function App() {
  const [activeView, setActiveView] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeScenarioKey, setActiveScenarioKey] = useState('scenarioA');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const handleSelectScenario = (key) => {
    setActiveScenarioKey(key);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return (
          <AdaptiveOverview
            onNavigate={setActiveView}
            onSelectScenario={handleSelectScenario}
          />
        );
      case 'playground':
        return (
          <AdaptivePlayground
            initialScenario={activeScenarioKey}
          />
        );
      case 'query_intelligence':
        return (
          <QueryIntelligence
            activeScenarioKey={activeScenarioKey}
            onSelectScenario={handleSelectScenario}
          />
        );
      case 'strategy_engine':
        return (
          <StrategyEngine
            onNavigate={setActiveView}
            onSelectScenario={handleSelectScenario}
          />
        );
      case 'dynamic_pipeline':
        return (
          <DynamicPipeline
            initialScenario={activeScenarioKey}
            onNavigate={setActiveView}
          />
        );
      case 'knowledge_sources':
        return <KnowledgeSources />;
      case 'analytics':
        return <RetrievalAnalytics />;
      case 'evaluation':
        return <EvaluationLab />;
      case 'models':
        return <ModelConfig />;
      case 'traces':
        return (
          <ExecutionTraces
            onNavigate={setActiveView}
            onSelectScenario={handleSelectScenario}
          />
        );
      case 'api':
        return <ApiIntegration />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <AdaptiveOverview
            onNavigate={setActiveView}
            onSelectScenario={handleSelectScenario}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080D1A] text-[#EAF2FF]">
      {/* Sidebar Navigation (Collapsible, 12 items) */}
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation Bar */}
        <Header
          activeView={activeView}
          onNavigate={setActiveView}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Command Palette (⌘K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={setActiveView}
        onSelectScenario={handleSelectScenario}
      />
    </div>
  );
}
