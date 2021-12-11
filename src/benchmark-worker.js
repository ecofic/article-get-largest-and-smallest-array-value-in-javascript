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
        warmUp();

        if (options.goal === 'minimum') {
            if (arrayType === 'values') {
                findMinPrimitiveValueWithWhile(options.useWhile);
                findMinPrimitiveValueWithFor(options.useFor);
                findMinPrimitiveValueWithForEach(options.useForEach);
                findMinPrimitiveValueWithForOf(options.useForOf);
                findMinPrimitiveValueWithForIn(options.useForIn);
                findMinPrimitiveValueWithMath(options.useMath);
                findMinPrimitiveValueWithReduce(options.useReduce);
                findMinPrimitiveValueWithMap(options.useMap);
            } else if (arrayType === 'objects') {
                findMinObjectValueWithWhile(options.useWhile);
                findMinObjectValueWithFor(options.useFor);
                findMinObjectValueWithForEach(options.useForEach);
                findMinObjectValueWithForOf(options.useForOf);
                findMinObjectValueWithForIn(options.useForIn);
                findMinObjectValueWithMath(options.useMath);    
                findMinObjectValueWithReduce(options.useReduce);
                findMinObjectValueWithMap(options.useMap);
            }
        } else if (options.goal === 'maximum') {
            if (arrayType === 'values') {

            } else if (arrayType === 'objects') {

            }
        }

        completeIteration();
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

            tempMinimum = minimum;
        }
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

            assertEquality(tempMinimum, minimum);
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

            assertEquality(tempMinimum, minimum);
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

            assertEquality(tempMinimum, minimum);
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

            assertEquality(tempMinimum, minimum);
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

            assertEquality(tempMinimum, minimum);
        }
    }

    /**
     * Finds the minimum value in an Array of primitive values using the reduce function.
     */
    function findMinPrimitiveValueWithReduce(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();
            const minimum = array.reduce((previous, current) => previous < current ? previous : current);
            iteration.reduceRuntime = performance.now() - startTime;

            assertEquality(tempMinimum, minimum);
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

            assertEquality(tempMinimum, minimum);
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

            tempMinimum = minimum;
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

            assertEquality(tempMinimum, minimum);
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

            assertEquality(tempMinimum, minimum);
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

            assertEquality(tempMinimum, minimum);
        }
    }

    /**
     * Finds the minimum value in an Array of objects using a for...in loop.
     * This function assumes a property named "p2" contains the value used for evaluation.
     */
     function findMinObjectValueWithForIn(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();

            let minimum = Number.NaN;
            for (let i in array) {
                if (array[i].p2 < minimum) {
                    minimum = array[i].p2;
                } else if (Number.isNaN(minimum)) {
                    minimum = array[i].p2;
                }
            }
            iteration.forInRuntime = performance.now() - startTime;

            assertEquality(tempMinimum, minimum);
        }
    }

    /**
     * Finds the minimum value in an Array of objects using Math.Min and the spread syntax.
     * This function assumes a property named "p2" contains the value used for evaluation.
     */
    function findMinObjectValueWithMath(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();            
            const mappings = [];

            let i = 0;
            while (i < array.length) {
                mappings.push(array[i].p2);
                i = i + 1;
            }

            const minimum = Math.min(...mappings);
            iteration.mathRuntime = performance.now() - startTime;

            assertEquality(tempMinimum, minimum);
        }
    }

    /**
     * Finds the minimum value in an Array of objects using the reduce function.
     * This function assumes a property named "p2" contains the value used for evaluation.
     */
     function findMinObjectValueWithReduce(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();
            const reducer = (previous, current) => {
                const pv = previous ??= current.p2;
                return pv < current.p2 ? pv : current.p2;
            };
            const minimum = array.reduce(reducer, null);
            iteration.reduceRuntime = performance.now() - startTime;

            assertEquality(tempMinimum, minimum);
        }
    }

    /**
     * Finds the minimum value in an Array of primitive values using the map function.
     * This function assumes a property named "p2" contains the value used for evaluation.
     */
     function findMinObjectValueWithMap(shouldRun) {
        if (shouldRun) {
            const startTime = performance.now();
            const mappings = array.map(i => i.p2);
            const minimum = Math.min(...mappings);
            iteration.mapRuntime = performance.now() - startTime;

            assertEquality(tempMinimum, minimum);
        }
    }

    function warmUp() {
        const iterations = 1000;

        let result = 0;
        for (let i1=0; i1<iterations; i1++) {
            result = result + i1;            
        }

        let i2 = 0;
        while (i2 < iterations) {
            result = result + i2;
            i2 = i2 + 1;
        }
    }

    /**
     * This function was created as a sanity check to ensure the same value was 
     * reached across implementations.
     */
    function assertEquality(expected, found) {
        if (found !== expected) {
            console.error(`expected: ${expected}, found: ${found}`);
            console.trace();

            return false;
        }

        return true;
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