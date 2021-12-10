// The arrays are globally defined because they're shared.
// This is typically not recommended.
let GLOBAL_ARRAY_1 = null;
let GLOBAL_ARRAY_2 = null;

onmessage = (e) => {
    let array = null;
    let arrayType = null;
    let iteration = null;

    /**
     * Initializes an array.
     */
     function initializeArray(arrayLength, arrayType) {        
        const results = [];
        if (arrayType === 'values') {
            for (let i=0; i<arrayLength; i++) {
                const value = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1 ;
                results.push(value);
            }
        } else if (arrayType === 'objects') {
            for (let i=0; i<arrayLength; i++) {
                const value = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1 ;
                const result = { p1:(i+1), p2:value, p3:`Number ${(i+1)}` };          // A generate object with three properties.
                results.push(result);
            }
        }
        return results;
    }

    /**
     * Runs a test iteration.
     * NOTE: This function assumes array1 and array2 have been initialized.
     */
    function runIteration(options) {
        iteration = { number: options.number };
        array = GLOBAL_ARRAY;
        arrayType = options.source;

        tempMinimum = null;

        if (options.goal === 'minimum') {
            if (arrayType === 'values') {
                findMinPrimitiveValueWithFor(options.useFor);
                findMinPrimitiveValueWithForEach(options.useForEach);
                findMinPrimitiveValueWithForOf(options.useForOf);
                findMinPrimitiveValueWithForIn(options.useForIn);
                findMinPrimitiveValueWithWhile(options.useWhile);
                findMinPrimitiveValueWithMath(options.useMath);
                findMinPrimitiveValueWithReduce(options.useReduce);
                findMinPrimitiveValueWithMap(options.useMap);
            } else if (arrayType === 'objects') {
                findMinObjectValueWithFor(options.useFor);
                findMinObjectValueWithForEach(options.useForEach);
                findMinObjectValueWithForOf(options.useForOf);
                findMinObjectValueWithForIn(options.useForIn);
                findMinObjectValueWithWhile(options.useWhile);
                findMinObjectValueWithMath(options.useMath);    
                findMinObjectValueWithReduce(options.useReduce);
                findMinObjectValueWithMap(options.useMap);
            }
        } else if (options.goal === 'maximum') {
            findMaxPrimitiveValueWithFor(options.useFor);
            findMaxPrimitiveValueWithForEach(options.useForEach);
            findMaxPrimitiveValueWithForOf(options.useForOf);
            findMaxPrimitiveValueWithForIn(options.useForIn);
            findMaxPrimitiveValueWithWhile(options.useWhile);
            findMaxPrimitiveValueWithMath(options.useMath);    
        } else if (options.goal === 'average') {

        }

        completeIteration();
    }

    /**
     * Finds the minimum value in an Array of primitive values using for loop.
     */
    function findMinPrimitiveValueWithFor(shouldRun) {
        if (shouldRun) {            
            const startTime = performance.now();

            let minimum = Number.NaN;
            for (let i=0; i<array.length; i++) {
                if (array[i] < minimum) {
                    minimum = array[i];
                } else if (Number.isNaN(minimum)) {
                    minimum = array[i];
                }
            }
            iteration.forRuntime = performance.now() - startTime;

            console.log(`for: found:${minimum}`);
            tempMinimum = minimum;
        }
    }

    /**
     * Finds the minimum value in an Array of primitive values using a forEach
     */
     function findMinPrimitiveValueWithForEach(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();

            let minimum = Number.NaN;
            array.forEach(i => {
                if (i < minimum) {
                    minimum = i;
                } else if (Number.isNaN(minimum)) {
                    minimum = i;
                }
            });
            iteration.forEachRuntime = performance.now() - startTime;

            console.log(`forEach: expected:${tempMinimum}, found:${minimum}`);
        }
    }

    /**
     * Finds the minimum value in an Array of primitive values using for loop.
     */
     function findMinPrimitiveValueWithForOf(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();

            let minimum = Number.NaN;
            for (let i of array) {
                if (i < minimum) {
                    minimum = i;
                } else if (Number.isNaN(minimum)) {
                    minimum = i;
                }
            }
            iteration.forOfRuntime = performance.now() - startTime;
            console.log(`forOf: expected:${tempMinimum}, found:${minimum}`);
        }
    }

    /**
     * Finds the minimum value in an Array of primitive values using a for...in loop.
     */
     function findMinPrimitiveValueWithForIn(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();

            let minimum = Number.NaN;
            for (let i in array) {
                if (array[i] < minimum) {
                    minimum = array[i];
                } else if (Number.isNaN(minimum)) {
                    minimum = array[i];
                }
            }
            iteration.forInRuntime = performance.now() - startTime;
            console.log(`forIn: expected:${tempMinimum}, found:${minimum}`);
        }
    }

    /**
     * Finds the minimum value in an Array of primitive values using a while loop.
     */
     function findMinPrimitiveValueWithWhile(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();
            let i = 0;

            let minimum = Number.NaN;
            while (i < array.length) {
                if (array[i] < minimum) {
                    minimum = array[i];
                } else if (Number.isNaN(minimum)) {
                    minimum = array[i];
                }
                i = i + 1;
            }
            iteration.whileRuntime = performance.now() - startTime;
            console.log(`while: expected:${tempMinimum}, found:${minimum}`);
        }
    }

    /**
     * Finds the minimum value in an Array of primitive values using Math.Min and the spread syntax.
     */
    function findMinPrimitiveValueWithMath(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();
            const minimum = Math.min(...array);
            iteration.mathRuntime = performance.now() - startTime;
            console.log(`math: expected:${tempMinimum}, found:${minimum}`);
        }
    }

    /**
     * Finds the minimum value in an Array of primitive values using the reduce function.
     */
    function findMinPrimitiveValueWithReduce(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();
            const minimum = array.reduce((last, val) => last < val ? last : val);
            iteration.reduceRuntime = performance.now() - startTime;
        }
    }

    /**
     * Finds the minimum value in an Array of primitive values using the map function.
     */
     function findMinPrimitiveValueWithMap(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();

            const mappings = array.map(i => i);
            const minimum = Math.min(...mappings);
            iteration.mapRuntime = performance.now() - startTime;

            console.log(`map: expected:${tempMinimum}, found:${minimum}`);
        }
    }

    /**
     * Finds the minimum value in an Array of objects using for loop.
     * This function assumes a property named "p2" contains the value used for evaluation.
     */
     function findMinObjectValueWithFor(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();

            let minimum = Number.NaN;
            for (let i=0; i<array.length; i++) {
                if (array[i].p2 < minimum) {
                    minimum = array[i].p2;
                } else if (Number.isNaN(minimum)) {
                    minimum = array[i].p2;
                }
            }
            iteration.forRuntime = performance.now() - startTime;
        }
    }

    /**
     * Finds the minimum value in an Array of objects using a forEach
     * This function assumes a property named "p2" contains the value used for evaluation.
     */
     function findMinObjectValueWithForEach(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();

            let minimum = Number.NaN;
            array.forEach(i => {
                if (i.p2 < minimum) {
                    minimum = i.p2;
                } else if (Number.isNaN(minimum)) {
                    minimum = i.p2;
                }
            });
            iteration.forEachRuntime = performance.now() - startTime;
        }
    }

    /**
     * Finds the minimum value in an Array of objects using for...of loop.
     * This function assumes a property named "p2" contains the value used for evaluation.
     */
     function findMinObjectValueWithForOf(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();

            let minimum = Number.NaN;
            for (let i of array) {
                if (i.p2 < minimum) {
                    minimum = i.p2;
                } else if (Number.isNaN(minimum)) {
                    minimum = i.p2;
                }
            }
            iteration.forOfRuntime = performance.now() - startTime;
        }
    }

    /**
     * Finds the minimum value in an Array of objects using a for...in loop.
     * This function assumes a property named "p2" contains the value used for evaluation.
     */
     function findMinObjectValueWithForIn(shouldRun) {
        console.error('The findMinObjectValueWithForIn function is not working yet.');
        if (shouldRun) {
            const startTime = performance.now();
            console.log('for...in:');

            let minimum = Number.NaN;
            for (let i in array) {
                if (i < minimum) {
                    minimum = i;
                } else if (Number.isNaN(minimum)) {
                    minimum = i;
                }
            }
            iteration.forInRuntime = performance.now() - startTime;
        }
    }

    /**
     * Finds the minimum value in an Array of objects using a while loop.
     * This function assumes a property named "p2" contains the value used for evaluation.
    */
     function findMinObjectValueWithWhile(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();
            let i = 0;

            let minimum = Number.NaN;
            while (i < array.length) {
                const item = array[i];
                if (item.p2 < minimum) {
                    minimum = item.p2;
                } else if (Number.isNaN(minimum)) {
                    minimum = item.p2;
                }
                i = i + 1;
            }
            iteration.whileRuntime = performance.now() - startTime;
        }
    }

    /**
     * Finds the minimum value in an Array of objects using Math.Min and the spread syntax.
     * This function assumes a property named "p2" contains the value used for evaluation.
     */
    function findMinObjectValueWithMath(shouldRun) {
        console.error('The findMinObjectValueWithMath function is not working yet.');
        if (shouldRun) {
            const startTime = performance.now();
            const minimum = Math.min(...array);
            iteration.mathRuntime = performance.now() - startTime;
        }
    }

    /**
     * Finds the minimum value in an Array of objects using the reduce function.
     * This function assumes a property named "p2" contains the value used for evaluation.
     */
     function findMinObjectValueWithReduce(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();
            const minimum = array.reduce((min, i) => i.p2 < min ? i.p2 : min, array[0].p2);
            iteration.reduceRuntime = performance.now() - startTime;
        }
    }

    /**
     * Finds the minimum value in an Array of primitive values using the map function.
     * This function assumes a property named "p2" contains the value used for evaluation.
     */
     function findMinObjectValueWithMap(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();
            const minimum = Math.min(array.map(i => i.p2));
            iteration.mapRuntime = performance.now() - startTime;
        }
    }

    /**
     * Finds the maximum value in an Array of primitive values using for loop.
     */
     function findMaxPrimitiveValueWithFor(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();

            let maximum = Number.NaN;
            for (let i=0; i<array.length; i++) {
                if (array[i] > maximum) {
                    maximum = array[i];
                } else if (Number.isNaN(maximum)) {
                    maximum = array[i];
                }
            }
            iteration.forRuntime = performance.now() - startTime;
        }
    }

    /**
     * Finds the maximum value in an Array of primitive values using a forEach
     */
     function findMaxPrimitiveValueWithForEach(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();

            let maximum = Number.NaN;
            array.forEach(i => {
                if (i < maximum) {
                    maximum = i;
                } else if (Number.isNaN(maximum)) {
                    maximum = i;
                }
            });
            iteration.forEachRuntime = performance.now() - startTime;
        }
    }

    /**
     * Finds the maximum value in an Array of primitive values using for...of loop.
     */
     function findMaxPrimitiveValueWithForOf(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();

            let maximum = Number.NaN;
            for (let i of array) {
                if (i < maximum) {
                    maximum = i;
                } else if (Number.isNaN(maximum)) {
                    maximum = i;
                }
            }
            iteration.forOfRuntime = performance.now() - startTime;
        }
    }

    /**
     * Finds the maximum value in an Array of primitive values using a for...in loop.
     */
     function findMaxPrimitiveValueWithForIn(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();

            let maximum = Number.NaN;
            for (let i in array) {
                if (i < maximum) {
                    maximum = i;
                } else if (Number.isNaN(maximum)) {
                    maximum = i;
                }
            }
            iteration.forInRuntime = performance.now() - startTime;
        }
    }

    /**
     * Finds the maximum value in an Array of primitive values using a while loop.
     */
     function findMaxPrimitiveValueWithWhile(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();
            let i = 0;

            let maximum = Number.NaN;
            while (i < array.length) {
                if (i < maximum) {
                    maximum = i;
                } else if (Number.isNaN(maximum)) {
                    maximum = i;
                }
                i = i + 1;
            }
            iteration.whileRuntime = performance.now() - startTime;
        }
    }

    /**
     * Finds the maximum value in an Array of primitive values using Math.Min and the spread syntax.
     */
    function findMaxPrimitiveValueWithMath(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();
            const maximum = Math.min(...array);
            iteration.mathRuntime = performance.now() - startTime;
        }
    }

    /**
     * Tests to see if the current iteration has completed.
     */
    function completeIteration() {
        const response = { command:'test-iteration-completed', iteration:iteration };
        postMessage(response);
    }

    // React to the command sent to the user.
    if (e.data.command === 'initialize-array') {
        GLOBAL_ARRAY = initializeArray(e.data.arrayLength, e.data.arrayType);

        const response = { command:'initialize-array-completed' };
        postMessage(response);
    } else if (e.data.command === 'run-iteration') {
        runIteration(e.data);
    }
};