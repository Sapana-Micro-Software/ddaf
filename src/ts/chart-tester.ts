// Comprehensive Chart Testing and Verification
// Tests all buttons, charts, diagrams, and graphs
// Copyright (C) 2025, Shyamal Suhana Chandra

export class ChartTester {
    /**
     * Test all tab buttons
     */
    static testTabButtons(): boolean {
        console.log('🧪 Testing tab buttons...');
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabs = ['accuracy', 'speed', 'memory', 'training', 'convergence'];
        let allWorking = true;

        tabButtons.forEach(function(button, index) {
            const expectedTab = tabs[index];
            const actualTab = button.getAttribute('data-tab');
            
            if (actualTab !== expectedTab) {
                console.error('❌ Tab button ' + index + ' mismatch: expected ' + expectedTab + ', got ' + actualTab);
                allWorking = false;
            } else {
                console.log('✅ Tab button ' + index + ' (' + expectedTab + ') OK');
            }

            // Test click handler (can't directly test event listeners, but button structure is correct)
            const htmlButton = button as HTMLElement;
            if (htmlButton.onclick !== null || htmlButton.getAttribute('onclick') !== null) {
                console.log('ℹ️  Inline click handler found');
            } else {
                // Event listener will be attached on initialization
                console.log('ℹ️  Click handler will be attached on initialization');
            }
        });

        if (allWorking) {
            console.log('✅ All tab buttons configured correctly');
        }
        return allWorking;
    }

    /**
     * Test all chart containers exist
     */
    static testChartContainers(): boolean {
        console.log('🧪 Testing chart containers...');
        const requiredCharts = [
            'imagenet-chart', 'cifar10-chart', 'glue-chart', 'cifar100-chart', 'squad-chart',
            'inference-speed-chart', 'training-throughput-chart',
            'memory-usage-chart', 'memory-efficiency-chart',
            'time-to-target-chart', 'total-training-time-chart',
            'epochs-convergence-chart', 'final-loss-chart'
        ];

        let allExist = true;
        requiredCharts.forEach(function(chartId) {
            const container = document.getElementById(chartId);
            if (!container) {
                console.error('❌ Chart container not found: ' + chartId);
                allExist = false;
            } else {
                console.log('✅ Container exists: ' + chartId);
            }
        });

        if (allExist) {
            console.log('✅ All ' + requiredCharts.length + ' chart containers found');
        }
        return allExist;
    }

    /**
     * Test all diagrams exist
     */
    static testDiagrams(): boolean {
        console.log('🧪 Testing diagram containers...');
        const diagrams = [
            'architecture-diagram',
            'data-flow-diagram',
            'network-diagram'
        ];

        let allExist = true;
        diagrams.forEach(function(diagramId) {
            const container = document.getElementById(diagramId);
            if (!container) {
                console.error('❌ Diagram container not found: ' + diagramId);
                allExist = false;
            } else {
                console.log('✅ Diagram container exists: ' + diagramId);
            }
        });

        return allExist;
    }

    /**
     * Test all graphs exist
     */
    static testGraphs(): boolean {
        console.log('🧪 Testing graph containers...');
        const graphs = [
            'performance-line-chart',
            'comparison-bar-chart',
            'accuracy-scatter-plot',
            'training-curve-chart',
            'relu-plot',
            'gelu-plot',
            'swish-plot',
            'ddaf-plot',
            'benchmark-bar-chart'
        ];

        let allExist = true;
        graphs.forEach(function(graphId) {
            const container = document.getElementById(graphId);
            if (!container) {
                console.error('❌ Graph container not found: ' + graphId);
                allExist = false;
            } else {
                console.log('✅ Graph container exists: ' + graphId);
            }
        });

        return allExist;
    }

    /**
     * Run all tests
     */
    static runAllTests(): void {
        console.log('🚀 Running comprehensive chart tests...\n');
        
        const buttonTest = this.testTabButtons();
        const containerTest = this.testChartContainers();
        const diagramTest = this.testDiagrams();
        const graphTest = this.testGraphs();

        console.log('\n📊 Test Results:');
        console.log('   Tab Buttons: ' + (buttonTest ? '✅ PASS' : '❌ FAIL'));
        console.log('   Chart Containers: ' + (containerTest ? '✅ PASS' : '❌ FAIL'));
        console.log('   Diagrams: ' + (diagramTest ? '✅ PASS' : '❌ FAIL'));
        console.log('   Graphs: ' + (graphTest ? '✅ PASS' : '❌ FAIL'));

        if (buttonTest && containerTest && diagramTest && graphTest) {
            console.log('\n🎉 All tests passed!');
        } else {
            console.log('\n⚠️  Some tests failed. Please check the errors above.');
        }
    }
}

// Export for global access
(window as any).ChartTester = ChartTester;

// Auto-run tests after a delay
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            ChartTester.runAllTests();
        }, 2000);
    });
} else {
    setTimeout(function() {
        ChartTester.runAllTests();
    }, 2000);
}
