// The arrays are globally defined because they're shared.
// This is typically not recommended.
let GLOBAL_ARRAY_1 = null;
let GLOBAL_ARRAY_2 = null;

onmessage = (e) => {
    let array = null;
    let iteration = null;

    let minimumFoundViaFor = false;
    let minimumFoundViaForEach = false;
    let minimumFoundViaForOf = false;
    let minimumFoundViaForIn = false;
    let minimumFoundViaWhile = false;
    let minimumFoundViaMath = false;

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

        if (options.goal === 'minimum') {
            findMinimumPrimitiveValueWithFor(options.useFor);
            findMinimumPrimitiveValueWithForEach(options.useForEach);
            findMinimumPrimitiveValueWithForOf(options.useForOf);
            findMinimumPrimitiveValueWithForIn(options.useForIn);
            findMinimumPrimitiveValueWithWhile(options.useWhile);
            findMinimumPrimitiveValueWithMath(options.useMath);    
        } else if (options.goal === 'maximum') {

        } else if (options.goal === 'average') {

        }
    }

    /**
     * Finds the minimum value in an Array or primitive values using for loop.
     */
    function findMinimumPrimitiveValueWithFor(shouldRun) {
        minimumFoundViaFor = false;
        if (shouldRun) {
            const startTime = performance.now();

            let minimum = Number.NaN;
            for (let i=0; i<array.length; i++) {
                if (array[i] < minimum) {
                    minimum = array[i];
                } else if (minimum === Number.NaN) {
                    minimum = array[i];
                }
            }
            iteration.forRuntime = performance.now() - startTime;
        }
        minimumFoundViaFor = true;

        assertCompleteIteration();
    }

    /**
     * Finds the minimum value in an Array of primitive values using a forEach
     */
     function findMinimumPrimitiveValueWithForEach(shouldRun) {
        minimumFoundViaForEach = false;
        if (shouldRun) {
            const startTime = performance.now();

            let minimum = Number.NaN;
            array.forEach(i => {
                if (i < minimum) {
                    minimum = i;
                } else if (minimum === Number.NaN) {
                    minimum = i;
                }
            });
            iteration.forEachRuntime = performance.now() - startTime;
        }
        minimumFoundViaForEach = true;

        assertCompleteIteration();
    }

    /**
     * Finds the minimum value in an Array or primitive values using for loop.
     */
     function findMinimumPrimitiveValueWithForOf(shouldRun) {
        minimumFoundViaForOf = false;
        if (shouldRun) {
            const startTime = performance.now();

            let minimum = Number.NaN;
            for (let i of array) {
                if (i < minimum) {
                    minimum = i;
                } else if (minimum === Number.NaN) {
                    minimum = i;
                }
            }
            iteration.forOfRuntime = performance.now() - startTime;
        }
        minimumFoundViaForOf = true;

        assertCompleteIteration();
    }

    /**
     * Finds the minimum value in an Array or primitive values using a for...in loop.
     */
     function findMinimumPrimitiveValueWithForIn(shouldRun) {
        minimumFoundViaForIn = false;
        if (shouldRun) {
            const startTime = performance.now();

            let minimum = Number.NaN;
            for (let i in array) {
                if (i < minimum) {
                    minimum = i;
                } else if (minimum === Number.NaN) {
                    minimum = i;
                }
            }
            iteration.forInRuntime = performance.now() - startTime;
        }
        minimumFoundViaForIn = true;

        assertCompleteIteration();
    }

    /**
     * Finds the minimum value in an Array or primitive values using a while loop.
     */
     function findMinimumPrimitiveValueWithWhile(shouldRun) {
        minimumFoundViaWhile = false;
        if (shouldRun) {
            const startTime = performance.now();
            let i = 0;

            let minimum = Number.NaN;
            while (i < array.length) {
                if (i < minimum) {
                    minimum = i;
                } else if (minimum === Number.NaN) {
                    minimum = i;
                }
                i = i + 1;
            }
            iteration.whileRuntime = performance.now() - startTime;
        }
        minimumFoundViaWhile = true;

        assertCompleteIteration();
    }

    /**
     * Finds the minimum value in an Array of primitive values using Math.Min and the spread syntax.
     */
    function findMinimumPrimitiveValueWithMath(shouldRun) {
        minimumFoundViaMath = false;
        if (shouldRun) {
            const startTime = performance.now();
            const minimum = Math.min(...array);
            iteration.mathRuntime = performance.now() - startTime;
        }
        minimumFoundViaMath = true;

        assertCompleteIteration();
    }

    /**
     * Tests to see if the current iteration has completed.
     */
    function assertCompleteIteration() {
        const isComplete = 
            minimumFoundViaFor && minimumFoundViaForEach && 
            minimumFoundViaForOf && minimumFoundViaForIn && 
            minimumFoundViaWhile && minimumFoundViaMath
        ;

        if (isComplete) {
            const response = { command:'test-iteration-completed', iteration:iteration };
            postMessage(response);
        }
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