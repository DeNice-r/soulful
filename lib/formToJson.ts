export function formToJson(form: HTMLFormElement): object {
    const formData = new FormData(form);
    const data: Record<string, unknown> = Object.fromEntries(formData);

    for (const key of Object.keys(data)) {
        if (data[key] === 'on') {
            data[key] = true;
        }
    }

    data['budget'] = Number(data['budget']);

    return data;
}
