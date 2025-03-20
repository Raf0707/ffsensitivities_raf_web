
interface Model {
    manufacturer: string;
    name: string;
    settings_source_url: string;
    dpi: number;
    fire_button: number;
    review: number;
    collimator: number;
    x2_scope: number;
    x4_scope: number;
    sniper_scope: number;
    free_review: number;
}

const SensitivityCard = ({ model }: { model: Model }) => {
    return (
        <div className="w-full max-w-md mx-auto border border-[#404942] rounded-xl p-4 bg-[#2A2F2C] text-[#DFE4DD] mt-4">
            <div className="space-y-4">
                {/* Слайдеры */}
                <div>
                    <label className="block text-sm font-medium mb-2">Review: {model.review}</label>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={model.review}
                        className="w-full"
                        disabled
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Collimator: {model.collimator}</label>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={model.collimator}
                        className="w-full"
                        disabled
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">x2 Scope: {model.x2_scope}</label>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={model.x2_scope}
                        className="w-full"
                        disabled
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">x4 Scope: {model.x4_scope}</label>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={model.x4_scope}
                        className="w-full"
                        disabled
                    />
                </div>

                {/* DPI и Fire Button */}
                <div className="text-sm">
                    <p>DPI: {model.dpi}</p>
                    <p>Fire Button: {model.fire_button}</p>
                </div>

                {/* Кнопка копирования */}
                <button
                    className="w-full bg-[#91D5AC] text-[#0F1511] py-2 px-4 rounded-lg hover:bg-[#7BBF97] transition-colors"
                    onClick={() => {
                        const settingsText = `DPI: ${model.dpi}\nReview: ${model.review}\nCollimator: ${model.collimator}\nx2 Scope: ${model.x2_scope}\nx4 Scope: ${model.x4_scope}\nSniper Scope: ${model.sniper_scope}\nFree Review: ${model.free_review}\nSource: ${model.settings_source_url}`;
                        navigator.clipboard.writeText(settingsText);
                    }}
                >
                    Copy Settings
                </button>
            </div>
        </div>
    );
};

export default SensitivityCard;