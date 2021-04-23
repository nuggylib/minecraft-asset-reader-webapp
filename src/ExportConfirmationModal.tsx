import React, { useEffect, useState } from "react"
import { useContentMap } from "./hooks/useContentMap"

export const ExportConfirmationModal = (props: {
    cancelHandler: () => void
}) => {
    const [blockScaleSizes, setBlockScaleSizes] = useState([1])
    const [scaleInput, setScaleInput] = useState(``)

    // TODO: Use this for a content map review portion of the modal
    // const contentMap = useContentMap({
    //     watch: null
    // })

    const splitTextByCommas = (text: string) => {
        return text.split(`,`)
    }

    /**
     * Scale size input handler
     * 
     * This method is responsible for replacing spaces with commas, as well as preventing
     * multiple commas from being used in succession. The end result should be a comma-separated
     * list of numeric values.
     * 
     * @param e 
     */
    const scaleSizeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const parsedText = e.target.value.replace(` `, `,`)
        const lastChar = parsedText.slice(-1)
        if (lastChar.match(/[a-z]/i)) return    // Exit early if a letter character was provided
        const storedLastChar = scaleInput.slice(-1)
        const values = splitTextByCommas(parsedText)
        const isValidInput = (values.filter(val => {
            let isValid = !isNaN(parseInt(val))
            if (val === ``) {
                isValid = true
            }
            return isValid
        }).length === values.length)
        if (isValidInput) {
            if ((lastChar === `,` && storedLastChar !== `,`) || lastChar !== `,`) {
                setScaleInput(parsedText)
            }
        } else if (parsedText === ``) {
            setScaleInput(``)
        }
    }

    const addBlockScaleSizes = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const sizes = scaleInput.split(`,`).map(str => parseInt(str))
        // Used to prevent duplicates and automatically-sorts the list in ascending order (by value)
        const obj = {} as any
        blockScaleSizes.forEach(size => {
            obj[size] = null
        })
        sizes.forEach(size => {
            obj[size] = null
        })
        setBlockScaleSizes(Object.keys(obj).map(key => parseInt(key)))
        setScaleInput(``)
    }

    const removeScaleSizeHandler = (size: number) => {
        let newArr = blockScaleSizes
        newArr.splice(blockScaleSizes.indexOf(size), 1)
        setBlockScaleSizes([
            ...newArr
        ])
    }

    return (
        <>
            <div className="modal-overlay"/>
            <div className="export-modal">
                <h1>Confirm Export</h1>
                <p>
                    Review your content map and specify the export path before exporting
                </p>
                <form>
                    <label>
                        Export path:
                        <input 
                            className="export-modal-input" 
                            type="input" 
                            placeholder="..."
                        />
                    </label>
                    <h3 className="export-modal-section-header">Block export settings</h3>
                    <div>
                        <label>
                            Add block scale:
                            <input 
                                className="export-modal-input" 
                                type="input" 
                                onChange={scaleSizeInputHandler}
                                placeholder="'1' or '1,2,3' etc" 
                                value={scaleInput}
                            />
                        </label>
                        <svg xmlns="http://www.w3.org/2000/svg" className="add-scale-size-button" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={addBlockScaleSizes}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="export-modal-section-table-header">Block image sizes</h4>
                        <p className="export-modal-section-table-description">
                            The list of scale sizes that will be used when generating block images
                        </p>
                        <table className="export-modal-section-table">
                            {blockScaleSizes.map((size, index) => {
                                const isEven = index % 2 === 0
                                return (
                                    <tr className={!!isEven ? `bg-gray-200` : ``}>
                                        <td className="space-x-4 px-4">
                                            <label className="scale-table-label">scale</label>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="remove-scale-size-button" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => removeScaleSizeHandler(size)}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <p className="scale-table-value">{size}x</p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                    <div className="space-x-4">
                        <button className="export-modal-cancel-button" onClick={props.cancelHandler}>Cancel</button>
                        {/* TODO: Disable this button if any content type is missing scale sizes */}
                        <input className="export-modal-save-button" type="submit" value="Submit"/>
                    </div>
                    
                </form>
            </div>
        </>
    )
}
