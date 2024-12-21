import React from "react";
import { Form, DatePicker, Input } from "antd";
import { Button as AntButton } from "antd";

function AddExpense({ loading, onFinish }) {
  const [form] = Form.useForm();
  return (
    <>
      {loading ? (
        <p>loading......</p>
      ) : (
        <div className="flex justify-center items-center h-full w-full md:h-full">
          <div className="flex flex-col w-[600px] pt-16 px-5 h-screen md:h-[65%] md:p-10 rounded-xl shadow-card">
            <Form
              layout="vertical"
              form={form}
              onFinish={(values) => {
                onFinish(values, "expensedetails");
                form.resetFields();
              }}
            >
              <Form.Item
                className="font-semibold"
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input name of the transaction!",
                  },
                ]}
              >
                <Input type="text" className="custom-input" />
              </Form.Item>

              <Form.Item
                className="font-semibold"
                label="Amount"
                name="amount"
                rules={[
                  { required: true, message: "Please enter the amount!" },
                ]}
              >
                <Input type="number" className="custom-input" />
              </Form.Item>

              <Form.Item
                className="font-semibold cursor-pointer"
                label="Date"
                name="date"
                rules={[
                  { required: true, message: "Please select income date!" },
                ]}
              >
                <DatePicker format="YYYY-MM-DD" className="custom-input" />
              </Form.Item>

              <Form.Item
                className="font-semibold"
                label="Source of Expenses"
                name="source"
                rules={[
                  {
                    required: true,
                    message: "Please input expenses!",
                  },
                ]}
              >
                <Input type="text" className="custom-input" />
              </Form.Item>

              <Form.Item>
                <AntButton className="btn" htmlType="submit">
                  Add Expense
                </AntButton>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddExpense;
