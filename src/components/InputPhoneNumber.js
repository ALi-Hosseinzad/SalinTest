import { convertPersianNumberToEnglish } from "../global/convert";
import FormItem from "./FormItem";
import { Input } from 'antd';

const InputPhoneNumber = () => {

    return (
        <FormItem
            label='شماره تماس'
            name='phone'
            rules={[
                {
                    required: true,
                    message: 'شماره تماس خود را وارد کنید',
                },
                {
                    whitespace: true,
                    message: 'شماره تماس نمی‌تواند شامل فاصله باشد',
                },
                () => ({
                    validator(_, value) {
                        if (!value) {
                            return Promise.reject();
                        }
                        if (isNaN(convertPersianNumberToEnglish(value))) {
                            return Promise.reject("شماره تماس باید عدد باشد");
                        }
                        if (convertPersianNumberToEnglish(value).length < 9) {
                            return Promise.reject("شماره تماس نباید کمتر از ۹ عدد باشد");
                        }
                        if (convertPersianNumberToEnglish(value).length > 9) {
                            return Promise.reject("شماره تماس نباید بیشتر از ۹ عدد باشد");
                        }
                        return Promise.resolve();
                    },
                }),
            ]}>
            <Input addonAfter="09" placeholder='xxxxxxxxx' size="large" className='phone' />
        </FormItem>
    );
};
export default InputPhoneNumber;